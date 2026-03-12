const express = require("express");

const chatRouter = express.Router();

const {
  fetchChatHistory,
  updateMessage,
  removeMessage,
  markMessageRead,
  getConversations,
  getUnreadCount
} = require("../controllers/chatController");

const { authenticate } = require("../middlewares/authMiddleware");

const {
  validateEditMessage,
  validateMessageId
} = require("../validators/chatValidator");


// Fetch chat history
chatRouter.get(
  "/conversations/:conversationId/messages",
  authenticate,
  fetchChatHistory
);


// Edit message
chatRouter.patch(
  "/messages/:messageId",
  authenticate,
  validateMessageId,
  validateEditMessage,
  updateMessage
);


// Delete message
chatRouter.delete(
  "/messages/:messageId",
  authenticate,
  validateMessageId,
  removeMessage
);


// Mark message as read
chatRouter.patch(
  "/messages/:messageId/read",
  authenticate,
  validateMessageId,
  markMessageRead
);

chatRouter.get(
  "/conversations/:userId",
  authenticate,
  getConversations
);

chatRouter.get(
  "/unread-count/:userId", 
  authenticate, 
  getUnreadCount
);

module.exports = chatRouter;