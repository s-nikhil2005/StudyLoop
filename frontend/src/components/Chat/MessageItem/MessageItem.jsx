import "./MessageItem.css";

function MessageItem({ message, currentUser }) {

  const isSender = message.senderId === currentUser;

  const formatTime = (date) => {
    const time = new Date(date);
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStatus = () => {
    if (!isSender) return null;

    if (message.read) return "✓✓";
    if (message.delivered) return "✓✓";
    return "✓";
  };

  return (
    <div className={`message-row ${isSender ? "sent" : "received"}`}>

      <div className="message-bubble">

        <div className="message-text">
          {message.text}
        </div>

        <div className="message-meta">
          <span className="message-time">
            {formatTime(message.createdAt)}
          </span>

          <span className="message-status">
            {renderStatus()}
          </span>
        </div>

      </div>

    </div>
  );
}

export default MessageItem;