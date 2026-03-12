const mongoose = require("mongoose");

/* ================================
   ENUMS
================================ */

const subjectEnum = ["Physics", "Chemistry", "Maths", "Biology"];
const levelEnum = ["Basic", "Intermediate", "Advanced"];
const daysEnum = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

/* ================================
   SUBSCHEMAS
================================ */

const subjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: subjectEnum,
    required: true
  },
  level: {
    type: String,
    enum: levelEnum,
    required: true
  },
  topics: [{
    type: String,
    trim: true
  }]
}, { _id: false });

const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: daysEnum,
    required: true
  },
  slots: [{
    startTime: {
      type: String,   // "14:00"
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  }]
}, { _id: false });

/* ================================
   MAIN PROFILE SCHEMA
================================ */

const profileSchema = new mongoose.Schema({

  /* 🔗 RELATION */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true
  },

  /* 👤 BASIC INFO */
  fullName: {
    type: String,
    required: true,
    trim: true
  },

  headline: {
  type: String,
  trim: true,
  maxlength: 60
},


  profilePhoto: {
    type: String,
    default: ""
  },

  bio: {
    type: String,
    maxlength: 500
  },

  classLevel: {
    type: String,
    enum: ["11th", "12th", "Dropper"]
  },

  examTarget: {
    type: String,
    enum: ["JEE", "NEET", "Both"]
  },

  location: {
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true }
  },

  timezone: {
    type: String,
    default: "Asia/Kolkata"
  },

  languages: [{
    type: String,
    trim: true
  }],

  /* 🎓 TEACHING SKILLS */
  subjectsKnown: [subjectSchema],

  /* 📚 LEARNING GOALS */
  subjectsToLearn: [subjectSchema],

  /* 🎯 MODE CONFIGURATION */
  mode: {
    canTeach: { type: Boolean, default: false },
    wantsToLearn: { type: Boolean, default: true },
    exchangeEnabled: { type: Boolean, default: false }
  },

  /* 💰 TEACHING CONFIG */
  teachingConfig: {
    hourlyRate: {
      type: Number,
      min: 0,
      default: 0
    },
    currency: {
      type: String,
      default: "INR"
    },
    availability: [availabilitySchema],
    totalSessions: {
      type: Number,
      default: 0
    }
  },

  /* ⭐ RATING SYSTEM */
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },

  /* 📊 ENGAGEMENT STATS */
  stats: {
    profileViews: { type: Number, default: 0 },
    searchAppearances: { type: Number, default: 0 },
    lastActive: { type: Date }
  },

  /* 🔗 SOCIAL LINKS */
  links: [linkSchema],

  /* 🔐 TRUST & MODERATION */
  verification: {
    isProfileVerified: { type: Boolean, default: false },
    isTeacherApproved: { type: Boolean, default: false }
  },

  moderation: {
    reportCount: { type: Number, default: 0 },
    isSuspended: { type: Boolean, default: false },
    suspensionReason: { type: String }
  },

  /* 👁 VISIBILITY */
  visibility: {
    isPublic: { type: Boolean, default: true },
    showHourlyRate: { type: Boolean, default: true }
  },

  /* 🧹 SOFT DELETE */
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },

  /* 📈 PROFILE COMPLETION */
  profileCompletion: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

/* ================================
   INDEXING STRATEGY
================================ */

// Text search
profileSchema.index({ fullName: "text", bio: "text" });

// Marketplace search optimization
profileSchema.index({ "subjectsKnown.subject": 1 });
profileSchema.index({ classLevel: 1, examTarget: 1 });
profileSchema.index({ "location.city": 1 });
profileSchema.index({ "rating.average": -1 });
profileSchema.index({ isActive: 1, "visibility.isPublic": 1 });

/* ================================
   AUTO PROFILE COMPLETION
================================ */

profileSchema.pre("save", function () {
  let score = 0;

  if (this.fullName) score += 15;
  if (this.bio) score += 15;
  if (this.profilePhoto) score += 10;
  if (this.subjectsKnown?.length > 0) score += 20;
  if (this.subjectsToLearn?.length > 0) score += 10;
  if (this.teachingConfig?.hourlyRate > 0) score += 10;
  if (this.links?.length > 0) score += 10;
  if (this.location?.city) score += 10;

  this.profileCompletion = Math.min(score, 100);
});

module.exports = mongoose.model("Profile", profileSchema);