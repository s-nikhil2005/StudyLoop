import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getCurrentUser } from "../../services/userService";

import ConversationList from "../sidebar/ConversationList/ConversationList";
import ChatWindow from "../Chat/ChatWindow/ChatWindow";

import "./MainChatComponents.css";

function MainChatComponents() {

  const { userId } = useParams();

  const [currentUser, setCurrentUser] = useState(null);
  const [activeUser, setActiveUser] = useState(userId || null);

  const [refreshConv, setRefreshConv] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true);


  useEffect(() => {

    const fetchUser = async () => {

      try {

        const response = await getCurrentUser();

        console.log("Fetched current user:", response);

        if (response?.user?._id) {
          setCurrentUser(response.user._id);
        }

      } catch (err) {

        console.error("User fetch error:", err);

      } finally {

        setLoadingUser(false);

      }

    };

    fetchUser();

  }, []);


  /* ✅ Only added this small block to use loadingUser */

  if (loadingUser) {
    return (
      <div className="chat-page">
        <div className="chat-container">
          <div className="empty-chat">
            Loading user...
          </div>
        </div>
      </div>
    );
  }


  return (

    <div className="chat-page">

      <div className="chat-container">

        {/* HEADER */}
        <div className="chat-header">

          <h3 className="chat-title">Messaging</h3>

          <input
            className="chat-search"
            placeholder="Search messages"
          />

          <div className="chat-icons">
            <span>✎</span>
          </div>

        </div>


        {/* BODY */}
        <div className="chat-body">

          <ConversationList
            currentUser={currentUser}
            activeUser={activeUser}
            refreshConv={refreshConv}
            onSelect={setActiveUser}
          />

          {activeUser ? (
            <ChatWindow
              currentUser={currentUser}
              receiverId={activeUser}
              onMessageSent={() => setRefreshConv(prev => prev + 1)}
            />
          ) : (
            <div className="empty-chat">
              Select a conversation to start chatting
            </div>
          )}

        </div>

      </div>

    </div>

  );

}

export default MainChatComponents;