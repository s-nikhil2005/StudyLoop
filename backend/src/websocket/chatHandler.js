const Message = require("../models/messageSchema");
const { v4: uuidv4 } = require("uuid");

async function handleChatMessage(data, clients) {

  try {

    const message = JSON.parse(data);

    const { senderId, receiverId, text, messageType } = message;

    // Validate message
    if (!senderId || !receiverId) {
      console.log("Invalid message data");
      return;
    }

    // Generate consistent conversationId
    const conversationId = [senderId, receiverId].sort().join("_");

    // Create message document
    const newMessage = new Message({
      messageId: uuidv4(),
      senderId,
      receiverId,
      conversationId,
      text: text || "",
      messageType: messageType || "text",
      delivered: false
    });

    // Save message
    const savedMessage = await newMessage.save();

    // Prepare payload to send via websocket
    const payload = {
      messageId: savedMessage.messageId,
      senderId: savedMessage.senderId,
      receiverId: savedMessage.receiverId,
      conversationId: savedMessage.conversationId,
      text: savedMessage.text,
      messageType: savedMessage.messageType,
      createdAt: savedMessage.createdAt
    };

    // Send message to receiver
    const receiverSocket = clients.get(receiverId);

    if (receiverSocket && receiverSocket.readyState === 1) {

      // Mark message delivered
      savedMessage.delivered = true;
      await savedMessage.save();

      receiverSocket.send(JSON.stringify(payload));

    }

    // Send message back to sender (sync both clients)
    const senderSocket = clients.get(senderId);

    if (senderSocket && senderSocket.readyState === 1) {

      senderSocket.send(JSON.stringify(payload));

    }

  } catch (error) {

    console.error("Chat message error:", error);

  }

}

module.exports = { handleChatMessage };