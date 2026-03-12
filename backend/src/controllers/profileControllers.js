const Profile = require("../models/profileSchema");

const User = require("../models/userSchema");
const cloudinary = require("../config/cloudinary");

/* ===============================
   GET PROFILE
================================ */
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate("user", "username email");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.json({ success: true, profile });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getProfileByUserId = async (req, res) => {
  try {

    const { userId } = req.params;

    const profile = await Profile
      .findOne({ user: userId })
      .populate("user", "username email");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.json({
      success: true,
      profile
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


/* ===============================
   UPDATE BASIC INFO
================================ */
exports.updateBasicInfo = async (req, res) => {
  try {
    const {
      fullName,
      headline,
      bio,
    //   classLevel,
    //   examTarget,
      languages,
    //   location
    } = req.body;

    const userId = req.user.id;

    let profile = await Profile.findOne({ user: userId });

    if (!profile) {
      const user = await User.findById(userId);

      profile = new Profile({
        user: userId,
        fullName: fullName || user.username
      });
    }

    if (fullName !== undefined) profile.fullName = fullName;
    if (headline !== undefined) profile.headline = headline;
    if (bio !== undefined) profile.bio = bio;
    // if (classLevel !== undefined) profile.classLevel = classLevel;
    // if (examTarget !== undefined) profile.examTarget = examTarget;
    if (languages !== undefined) profile.languages = languages;
    // if (location !== undefined) profile.location = location;

    await profile.save();

    res.json({
      success: true,
      message: "Basic info updated",
      profile
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* ===============================
   UPLOAD PROFILE PHOTO
================================ */
exports.uploadProfilePhoto = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    const uploadedImage = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "studyloop_profiles" }
    );

    profile.profilePhoto = uploadedImage.secure_url;
    await profile.save();

    res.json({
      success: true,
      profile
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* ===============================
   REMOVE PROFILE PHOTO
================================ */
exports.removeProfilePhoto = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    profile.profilePhoto = "";

    await profile.save();

    res.json({
      success: true,
      message: "Profile photo removed",
      profile
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* ===============================
   DELETE PROFILE
================================ */
exports.deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });

    res.json({
      success: true,
      message: "Profile deleted"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   UPDATE SUBJECTS KNOWN
================================ */

exports.updateTeachingSkills = async (req, res) => {
  try {
    const userId = req.user._id;

    const { subjects } = req.body; 
    // expecting array of objects

    if (!Array.isArray(subjects)) {
      return res.status(400).json({
        message: "Subjects must be an array"
      });
    }

  const profile = await Profile.findOneAndUpdate(
  { user: userId },
  { subjectsKnown: subjects },
  { returnDocument: "after" }
);

    res.status(200).json({
      message: "Teaching skills updated successfully",
      profile
    });

  } catch (error) {
    console.error("Update Teaching Skills Error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* ===============================
   UPDATE SUBJECTS TO LEARN
================================ */

exports.updateLearningGoals = async (req, res) => {
  try {
    const userId = req.user._id;

    const { subjects } = req.body;

    if (!Array.isArray(subjects)) {
      return res.status(400).json({
        message: "Subjects must be an array"
      });
    }

   const profile = await Profile.findOneAndUpdate(
  { user: userId },
  { subjectsToLearn: subjects },
  { returnDocument: "after" }
);

    res.status(200).json({
      message: "Learning goals updated successfully",
      profile
    });

  } catch (error) {
    console.error("Update Learning Goals Error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};