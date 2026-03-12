import api from "../api/axios";

/* GET CHAT HISTORY */
export const getChatHistory = async (conversationId) => {
  const response = await api.get(
    `/chat/conversations/${conversationId}/messages`
  );
  return response.data;
};


/* EDIT MESSAGE */
export const editMessage = async (messageId, text) => {
  const response = await api.patch(
    `/chat/messages/${messageId}`,
    { text }
  );
  return response.data;
};


/* DELETE MESSAGE */
export const deleteMessage = async (messageId) => {
  const response = await api.delete(
    `/chat/messages/${messageId}`
  );
  return response.data;
};


/* MARK MESSAGE AS READ */
export const markMessageRead = async (messageId) => {
  const response = await api.patch(
    `/chat/messages/${messageId}/read`
  );
  return response.data;
};

export const getConversations = async (userId) => {
  const response = await api.get(`/chat/conversations/${userId}`);
  return response.data;
};

export const getUnreadCount = async (userId) => {

  const response = await api.get(`/chat/unread-count/${userId}`);

  return response.data;

};