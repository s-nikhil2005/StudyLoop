import "./ConversationItem.css";

function ConversationItem({ conversation, onClick }) {

  const name = conversation.fullName || conversation.name || "User";

  return (

    <div className="conversation-item" onClick={onClick}>

      <div className="user-avatar">

        {conversation.profilePhoto ? (

          <img
            src={conversation.profilePhoto}
            alt={name}
            className="avatar-img"
          />

        ) : (

          name.charAt(0).toUpperCase()

        )}

      </div>

      <div className="conversation-info">

        <div className="conversation-top">

          <span className="user-name">{name}</span>

        {conversation.lastMessageTime && (
  <span className="message-time">
    {new Date(conversation.lastMessageTime).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })}
  </span>
)}

        </div>

        <div className="conversation-bottom">

          {conversation.lastMessage && (
            <span className="last-message">
              {conversation.lastMessage}
            </span>
          )}

        </div>

      </div>

    </div>

  );

}

export default ConversationItem;