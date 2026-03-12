const express = require("express");
const profileRouter = express.Router();

const { authenticate } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const {
  getProfile,
  getProfileByUserId,
  updateBasicInfo,
  uploadProfilePhoto,
  removeProfilePhoto,
  deleteProfile,
  updateTeachingSkills,
  updateLearningGoals
} = require("../controllers/profileControllers");

// Get profile
profileRouter.get("/", authenticate, getProfile);

profileRouter.get("/user/:userId", getProfileByUserId);

// Update name & bio
profileRouter.patch("/update-basic-info", authenticate, updateBasicInfo);

// Upload image
profileRouter.patch(
  "/photo",
  authenticate,
  upload.single("profilePhoto"),
  uploadProfilePhoto
);

// Remove image
profileRouter.delete("/photo", authenticate, removeProfilePhoto);

// Delete profile
profileRouter.delete("/", authenticate, deleteProfile);

profileRouter.patch(
  "/teaching-skills",
  authenticate,
  updateTeachingSkills
);

profileRouter.patch(
  "/learning-goals",
  authenticate,
  updateLearningGoals
);

module.exports = profileRouter;