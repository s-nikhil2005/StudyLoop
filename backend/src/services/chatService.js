const Message = require("../models/messageSchema");

async function sendMessage(data) {

  const message = await Message.create(data);

  return message;

}

async function getConversationMessages(conversationId, limit = 50) {

 
    const messages = await Message.find({ conversationId })
    .sort({ createdAt: 1 })
    .limit(limit)
    .lean();

  return messages;

}

async function markAsRead(messageId, userId) {

  const message = await Message.findOne({ messageId });

  if (!message) {
    throw new Error("Message not found");
  }
async function markAsRead(messageId, userId) {

  const message = await Message.findOne({ messageId });

  if (!message) {
    throw new Error("Message not found");
  }

  // Only receiver can mark message as read
  if (message.receiverId.toString() !== userId) {
    throw new Error("You cannot mark this message as read");
  }

  message.read = true;

  await message.save();

  return message;
}
  // Only receiver can mark message as read
  if (message.receiverId.toString() !== userId) {
    throw new Error("You cannot mark this message as read");
  }

  message.read = true;

  await message.save();

  return message;
}

async function markAsDelivered(messageId) {

  return Message.findOneAndUpdate(
    { messageId },
    { delivered: true },
    { new: true }
  );

}

async function editMessage(messageId, text, userId) {

  const message = await Message.findOne({ messageId });

  if (!message) {
    throw new Error("Message not found");
  }

  // Authorization check
  if (message.senderId.toString() !== userId) {
    throw new Error("You cannot edit this message");
  }

  message.text = text;
  message.edited = true;

  await message.save();

  return message;
}

async function deleteMessage(messageId, userId) {

  const message = await Message.findOne({ messageId });

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.senderId.toString() !== userId) {
    throw new Error("You cannot delete this message");
  }

  message.deleted = true;

  await message.save();

  return message;
}

module.exports = {
  sendMessage,
  getConversationMessages,
  markAsRead,
  markAsDelivered,
  editMessage,
  deleteMessage
};