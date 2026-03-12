import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/profileService";
import { getConversations } from "../../../services/chatServices";

import ConversationItem from "../ConversationItem/ConversationItem";
import "./ConversationList.css";

function ConversationList({ currentUser, activeUser, onSelect, refreshConv }) {

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!currentUser) return;

    const loadConversations = async () => {

      setLoading(true);

      try {

        const res = await getConversations(currentUser);

        let convs = res.conversations || [];

        // Check if selected user already exists in list
        const exists = convs.some(conv => conv.userId === activeUser);

        // If user opened chat but conversation doesn't exist yet
        if (activeUser && !exists) {

          try {

            const profileRes = await getUserProfile(activeUser);
            const profile = profileRes.profile;

            const newConversation = {
              userId: profile.user._id,
              fullName: profile.fullName,
              profilePhoto: profile.profilePhoto,
              lastMessage: "",
              lastMessageTime: ""
            };

            convs = [newConversation, ...convs];

          } catch (profileError) {

            console.error("Profile fetch error:", profileError);

          }

        }

        setConversations(convs);
        if (!activeUser && convs.length > 0) {
  onSelect(convs[0].userId);
}

      } catch (error) {

        console.error("Conversation fetch error:", error);

      } finally {

        setLoading(false);

      }

    };

    loadConversations();

  }, [currentUser, activeUser, refreshConv,onSelect]);



  return (

    <div className="conversation-list">

      <div className="conversation-body">

        {loading && (
          <p className="empty-text">Loading conversations...</p>
        )}

        {!loading && conversations.length === 0 && (
          <p className="empty-text">No conversations yet</p>
        )}

        {!loading && conversations.map((conversation) => (

          <ConversationItem
            key={conversation.userId}
            conversation={conversation}
            isActive={conversation.userId === activeUser}
            onClick={() => onSelect(conversation.userId)}
          />

        ))}

      </div>

    </div>

  );

}

export default ConversationList;