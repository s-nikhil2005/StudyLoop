import { useState } from "react";

function ChatPanel({ messages, socketRef }) {
  const [chatInput, setChatInput] = useState("");

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    socketRef.current?.send(JSON.stringify({
      type: "chat",
      text: chatInput
    }));

    setChatInput("");
  };

  return (
    <div>
      <h3>Chat</h3>

      <div style={{ height: "200px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}>{m.text}</div>
        ))}
      </div>

      <input
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatPanel;