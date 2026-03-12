import { useState } from "react";
import "./MessageInput.css";

function MessageInput({ onSend }) {

  const [text, setText] = useState("");

  const handleSend = () => {

    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="message-input-container">

      <input
        type="text"
        placeholder="Type message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        className="message-input"
      />

      <button
        className="send-button"
        onClick={handleSend}
      >
        Send
      </button>

    </div>
  );
}

export default MessageInput;