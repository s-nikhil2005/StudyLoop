import { useEffect, useRef } from "react";
import MessageItem from "../MessageItem/MessageItem";
import "./MessageList.css";

function MessageList({ messages, currentUser, typingUser }) {

  const messageContainerRef = useRef(null);
  const bottomRef = useRef(null);

  // check if user is near bottom
  const isNearBottom = () => {
    const container = messageContainerRef.current;

    if (!container) return true;

    const threshold = 100;

    return (
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight <
      threshold
    );
  };

  // auto scroll only when needed
  useEffect(() => {

    if (isNearBottom()) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth"
      });
    }

  }, [messages]);

  return (
    <div
      className="message-list"
      ref={messageContainerRef}
    >

      {messages.map((msg) => (
        <MessageItem
          key={msg._id}
          message={msg}
          currentUser={currentUser}
        />
      ))}

      {typingUser && (
        <div className="typing-indicator">
          {typingUser} is typing...
        </div>
      )}

      <div ref={bottomRef}></div>

    </div>
  );
}

export default MessageList;