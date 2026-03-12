import { useState, useEffect, useRef } from "react";
import MessageList from "../MessageList/MessageList";
import MessageInput from "../MessageInput/MessageInput";

import { getUserProfile } from "../../../services/profileService";
import { getChatHistory } from "../../../services/chatServices";

import "./ChatWindow.css";

function ChatWindow({ currentUser, receiverId, onMessageSent }) {

  const conversationId = [currentUser, receiverId].sort().join("_");

  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [receiverProfile, setReceiverProfile] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const socketRef = useRef(null);
  const conversationRef = useRef(conversationId);


  /* ================================
     Keep latest conversationId
  ================================= */

  useEffect(() => {
    conversationRef.current = conversationId;
  }, [conversationId]);


  /* ================================
     Fetch Receiver Profile
  ================================= */

  useEffect(() => {

    if (!receiverId) return;

    const fetchReceiverProfile = async () => {
      try {

        const res = await getUserProfile(receiverId);
        setReceiverProfile(res.profile);

      } catch (err) {
        console.error("Receiver profile error:", err);
      }
    };

    fetchReceiverProfile();

  }, [receiverId]);


  /* ================================
     Load Chat History
  ================================= */

  useEffect(() => {

    if (!conversationId) return;

    const fetchMessages = async () => {

      try {

        const res = await getChatHistory(conversationId);

        setMessages(res.data || []);

        

      } catch (err) {

        console.error("Fetch messages error:", err);

      }

    };

    fetchMessages();

  }, [conversationId]);


  /* ================================
     WebSocket Connection
  ================================= */

  useEffect(() => {

    if (!currentUser) return;

    const socket = new WebSocket(
      `ws://localhost:7000/?userId=${currentUser}`
    );

    socketRef.current = socket;

    socket.onopen = () => {
      setSocketConnected(true);
    };

    socket.onmessage = (event) => {

      const data = JSON.parse(event.data);

      if (data.type === "typing") {

        setTypingUser(data.senderId);

        setTimeout(() => {
          setTypingUser(null);
        }, 2000);

        return;
      }

      if (data.conversationId === conversationRef.current) {

        setMessages(prev => [...prev, data]);

      }

    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      setSocketConnected(false);
    };

    return () => {
      socket.close();
    };

  }, [currentUser]);


  /* ================================
     Send Message
  ================================= */

  const sendMessage = (text) => {

    if (!text || !text.trim()) return;

    const message = {
      senderId: currentUser,
      receiverId,
      text
    };

    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {

      socketRef.current.send(JSON.stringify(message));

      if (onMessageSent) {
        onMessageSent();
      }

    }

  };


  /* ================================
     Typing Indicator
  ================================= */

  const handleTyping = () => {

    if (!socketConnected) return;

    socketRef.current.send(
      JSON.stringify({
        type: "typing",
        senderId: currentUser,
        receiverId
      })
    );

  };


  return (

    <div className="chat-window">

      <div className="chat-header">

        {receiverProfile ? (

          <div className="chat-user-info">
            <div className="chat-name">
              {receiverProfile.fullName}
            </div>
          </div>

        ) : (
          "Loading..."
        )}

      </div>


      <MessageList
        messages={messages}
        currentUser={currentUser}
        typingUser={typingUser}
      />


      <MessageInput
        onSend={sendMessage}
        onTyping={handleTyping}
      />

    </div>

  );

}

export default ChatWindow;