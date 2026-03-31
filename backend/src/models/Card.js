const mongoose = require("mongoose");

const levelEnum = ["Basic", "Intermediate", "Advanced"];

const cardSchema = new mongoose.Schema({

  /* USER */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  /* CARD TYPE */
  type: {
    type: String,
    enum: ["exchange", "paid", "skill"], // added skill
    required: true
  },

  /* TEACH DATA */
  teach: {

    source: {
      type: String,
      enum: ["skills", "custom"],
      default: "custom"
    },

    skillRef: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },

    subject: {
      type: String,
      required: true
    },

    topic: {
      type: String,
      required: true,
      index: true
    },

    level: {
      type: String,
      enum: levelEnum,
      required: true
    }

  },

  /* LEARN DATA (only exchange cards) */
  learn: {

    source: {
      type: String,
      enum: ["skills", "custom"],
      default: "custom"
    },

    skillRef: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },

    subject: {
      type: String,
      default: null
    },

    topic: {
      type: String,
      default: null
    },

    level: {
      type: String,
      enum: levelEnum,
      default: null
    }

  },

  /* PRICE (only paid cards) */
  price: {

    amount: {
      type: Number,
      min: 0,
      default: null
    },

    currency: {
      type: String,
      default: "INR"
    }

  },

    /* DESCRIPTION */
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },

  /* CARD STATS */
  stats: {

    views: {
      type: Number,
      default: 0
    },

    sessions: {
      type: Number,
      default: 0
    }

  },

  image: {
  type: String,
  default: null
},

  /* ACTIVE STATUS */
  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

/* SEARCH INDEXES */

cardSchema.index({ "teach.topic": "text" });

cardSchema.index(
{
  user: 1,
  type: 1,
  "teach.subject": 1,
  "teach.topic": 1,
  "teach.level": 1
},
{ unique: true }
);

module.exports =mongoose.models.Card ||  mongoose.model("Card", cardSchema);