const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

     messageId: {
    type: String,
    required: true
    },


    conversationId: {
      type: String,
      required: true,
      index: true
    },

    text: {
      type: String,
      trim: true
    },

    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text"
    },

   
    read: {
      type: Boolean,
      default: false,
      index: true
    },

    delivered: {
      type: Boolean,
      default: false
    },

    isRead: {
    type: Boolean,
    default: false
  },

    edited: {
      type: Boolean,
      default: false
    },

    deleted: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true
  }
);

messageSchema.index({ senderId: 1, receiverId: 1 });

module.exports = mongoose.model("Message", messageSchema);