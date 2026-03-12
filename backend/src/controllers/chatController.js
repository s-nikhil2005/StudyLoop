const {
  getConversationMessages,
  editMessage,
  deleteMessage,
  markAsRead
} = require("../services/chatService");
const Message = require("../models/messageSchema");
// const {User} = require("../models/userSchema");
const Profile = require("../models/profileSchema");

// async function fetchChatHistory(req, res) {

//   try {

//     const { conversationId } = req.params;

//     const messages = await getConversationMessages(conversationId);

//     res.status(200).json({
//       success: true,
//       data: messages
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch chat history"
//     });

//   }

// }

// async function fetchChatHistory(req, res) {

//   const { conversationId } = req.params;

//   const [user1, user2] = conversationId.split("_");

//   const messages = await Message.find({
//     conversationId
//   }).sort({ createdAt: 1 });

//   await Message.updateMany(
//     {
//       senderId: user2,
//       receiverId: user1,
//       isRead: false
//     },
//     { isRead: true }
//   );

//   res.json({
//     success: true,
//     data: messages
//   });

// }


async function fetchChatHistory(req, res) {

  try {

    const { conversationId } = req.params;

    const currentUser = req.user.id;

    const messages = await Message.find({
      conversationId
    }).sort({ createdAt: 1 });

    // ⭐ Mark messages sent TO current user as read
    await Message.updateMany(
      {
        conversationId,
        receiverId: currentUser,
        isRead: false
      },
      { isRead: true }
    );

    res.json({
      success: true,
      data: messages
    });

  } catch (error) {

    console.error("Fetch chat error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch chat history"
    });

  }

}

async function updateMessage(req, res) {

  try {

    const { messageId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message text is required"
      });
    }

    const updated = await editMessage(messageId, text, userId);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updated
    });

  } catch (error) {

    res.status(403).json({
      success: false,
      message: error.message
    });

  }

}

async function removeMessage(req, res) {

  try {

    const { messageId } = req.params;
    const userId = req.user.id;

    const deleted = await deleteMessage(messageId, userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.status(200).json({
      success: true,
      data: deleted
    });

  } catch (error) {

    res.status(403).json({
      success: false,
      message: error.message
    });

  }

}


async function markMessageRead(req, res) {

  try {

    const { messageId } = req.params;
    const userId = req.user.id;

    const updated = await markAsRead(messageId, userId);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updated
    });

  } catch (error) {

    res.status(403).json({
      success: false,
      message: error.message
    });

  }

}

async function getConversations(req, res) {

  try {

    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }).sort({ createdAt: -1 });

    const conversations = {};

    messages.forEach(msg => {

      // Fix ObjectId comparison
      const otherUser =
        msg.senderId.toString() === userId
          ? msg.receiverId.toString()
          : msg.senderId.toString();

      if (!conversations[otherUser]) {

        conversations[otherUser] = {
          userId: otherUser,
          lastMessage: msg.text,
          lastMessageTime: msg.createdAt
        };

      }

    });

    // ⭐ Fetch user details (name + photo)
    const conversationArray = await Promise.all(

      Object.values(conversations).map(async (conv) => {

       const profile = await Profile.findOne({ user: conv.userId })
  .select("fullName profilePhoto");

       return {
  ...conv,
  fullName: profile?.fullName || "User",
  profilePhoto: profile?.profilePhoto || ""
};

      })

    );

    res.json({
      success: true,
      conversations: conversationArray
    });

  } catch (error) {

    console.error("Conversation Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch conversations"
    });

  }

}

async function getUnreadCount(req, res) {

  const { userId } = req.params;

  const count = await Message.countDocuments({
    receiverId: userId,
    isRead: false
  });

  res.json({ count });

}


module.exports = {
  fetchChatHistory,
  updateMessage,
  removeMessage,
  markMessageRead,
  getConversations,
  getUnreadCount

};