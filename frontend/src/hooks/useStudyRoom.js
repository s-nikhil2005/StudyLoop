import { useEffect, useRef, useState } from "react";

export default function useStudyRoom(roomCode) {

  const localVideoRef = useRef(null);
  const socketRef = useRef(null);

  const peersRef = useRef({}); // multiple users

  const userIdRef = useRef(null);

  const [userId, setUserId] = useState(null); // ✅ FIX
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [remoteStreams, setRemoteStreams] = useState([]);

  const createPeer = (targetUserId, stream) => {

    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    peersRef.current[targetUserId] = peer;

    stream.getTracks().forEach(track => {
      peer.addTrack(track, stream);
    });

    peer.ontrack = (event) => {
      setRemoteStreams(prev => [...prev, event.streams[0]]);
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.send(JSON.stringify({
          webrtc: true,
          type: "ice-candidate",
          senderId: userIdRef.current,
          targetUserId,
          candidate: event.candidate
        }));
      }
    };

    return peer;
  };

  useEffect(() => {

    const startCall = async () => {

      // ✅ generate userId
     userIdRef.current = crypto.randomUUID();
      setUserId(userIdRef.current);

      // 🎥 camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      localVideoRef.current.srcObject = stream;

      // 🔌 socket
      const socket = new WebSocket(
        `ws://localhost:7000?userId=${userIdRef.current}`
      );

      socketRef.current = socket;

      socket.onopen = () => {
        socket.send(JSON.stringify({
           webrtc: true,
          type: "join-room",
          roomCode
        }));
      };

      socket.onmessage = async (event) => {

        const message = JSON.parse(event.data);

        // 👥 room joined
        if (message.type === "room-joined") {
          setParticipants(message.participants || []);
        }

        // 👤 new user
        if (message.type === "user-joined") {

          setParticipants(prev => [...prev, message.userId]);

          const peer = createPeer(message.userId, stream);

          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);

          socket.send(JSON.stringify({
            webrtc: true,
            type: "offer",
            senderId: userIdRef.current,
            targetUserId: message.userId,
            offer
          }));
        }

        // 📩 offer received
        if (message.type === "offer") {

          const peer = createPeer(message.senderId, stream);

          await peer.setRemoteDescription(
            new RTCSessionDescription(message.offer)
          );

          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);

          socket.send(JSON.stringify({
            webrtc: true,
            type: "answer",
            senderId: userIdRef.current,
            targetUserId: message.senderId,
            answer
          }));
        }

        // 📩 answer received
        if (message.type === "answer") {

          const peer = peersRef.current[message.senderId];

          if (peer) {
            await peer.setRemoteDescription(
              new RTCSessionDescription(message.answer)
            );
          }
        }

        // ❄️ ICE
        if (message.type === "ice-candidate") {

          const peer = peersRef.current[message.senderId];

          if (peer) {
            await peer.addIceCandidate(
              new RTCIceCandidate(message.candidate)
            );
          }
        }

        // 💬 chat
        if (message.chat) {
          setMessages(prev => [...prev, {
            sender: message.senderId,
            text: message.text
          }]);
        }

      };

    };

    startCall();

  }, [roomCode]);

  return {
    localVideoRef,
    remoteStreams,
    participants,
    messages,
    socketRef,
    userId // ✅ FIXED
  };
}