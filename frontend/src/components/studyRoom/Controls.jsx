import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Controls({ localVideoRef, socketRef, peersRef }) {

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const navigate = useNavigate();

  // 🎤 Mute / Unmute
  const toggleAudio = () => {
    const stream = localVideoRef.current?.srcObject;

    if (!stream) return;

    stream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });

    setIsMuted(prev => !prev);
  };

  // 📹 Camera On / Off
  const toggleVideo = () => {
    const stream = localVideoRef.current?.srcObject;

    if (!stream) return;

    stream.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
    });

    setIsVideoOff(prev => !prev);
  };

  // ❌ Leave Room (FULL CLEANUP)
  const leaveRoom = () => {

    // 🛑 Stop camera
    const stream = localVideoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    // 🔌 Close WebSocket
    if (socketRef?.current) {
      socketRef.current.close();
    }

    // 🔗 Close all peer connections
    if (peersRef?.current) {
      Object.values(peersRef.current).forEach(peer => {
        try {
          peer.close();
        } catch (err) {
          console.log("Peer close error:", err);
        }
      });
    }

    // 🚪 Navigate out
    navigate("/host");
  };

  return (
    <div style={{
      marginTop: "20px",
      display: "flex",
      gap: "10px"
    }}>

      <button onClick={toggleAudio}>
        {isMuted ? "Unmute" : "Mute"}
      </button>

      <button onClick={toggleVideo}>
        {isVideoOff ? "Start Video" : "Stop Video"}
      </button>

      <button
        onClick={leaveRoom}
        style={{
          background: "red",
          color: "white",
          padding: "5px 10px",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Leave
      </button>

    </div>
  );
}

export default Controls;