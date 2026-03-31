const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // For skill rating (user-based)
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // For paid card rating
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card"
    },

    type: {
      type: String,
      enum: ["paid", "skill"],
      required: true
    },

    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    review: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);