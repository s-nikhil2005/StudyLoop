import { useParams } from "react-router-dom";
import useStudyRoom from "../hooks/useStudyRoom";

import VideoSection from "../components/studyRoom/VideoSection";
import ParticipantsPanel from "../components/studyRoom/ParticipantsPanel";
import ChatPanel from "../components/studyRoom/ChatPanel";
import Controls from "../components/studyRoom/Controls";

function StudyRoom() {
  const { roomCode } = useParams();

  const {
    localVideoRef,
    remoteStreams,
    participants,
    messages,
    socketRef,
    userId,
    peersRef 
  } = useStudyRoom(roomCode);

  return (
    <div style={{ padding: "20px" }}>

      <h2>Room: {roomCode}</h2>

      <div style={{ display: "flex", gap: "30px" }}>

        {/* LEFT SIDE */}
        <div>
          <VideoSection
            localVideoRef={localVideoRef}
            remoteStreams={remoteStreams}
          />

          <Controls
  localVideoRef={localVideoRef}
  socketRef={socketRef}
  peersRef={peersRef}
/>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <ParticipantsPanel
            participants={participants}
            userId={userId}
          />

          <ChatPanel
            messages={messages}
            socketRef={socketRef}
          />
        </div>

      </div>
    </div>
  );
}

export default StudyRoom;