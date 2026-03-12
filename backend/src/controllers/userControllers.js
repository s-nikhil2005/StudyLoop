const {redisClient} = require('../config/redis');
const {SECRET_KEY} = require('../constants');
const {User} = require('../models/userSchema');
const Profile = require("../models/profileSchema");
const {apiResponse}= require('../utils/apiResponse');
const {sendOTP}= require('../services/emailServices');
const {
        generateOTP,
        storeOTP,
        getStoredOTP,
        removeStoredOTP,
        verifyOTP
      } = require('../services/otpService');
      
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const query = username ? { username } : { email };
    const existingUser = await User.findOne(query);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = await generateOTP(email, "register");

    await redisClient.setEx(
      `register:${email}`,
      300,
      JSON.stringify({
        username,
        email,
        password: hashedPassword,
      })
    );

    // Send email async (no await)
    sendOTP({
      to: email,
      subject: "StudyLoop email verification code",
      text: `Your OTP is ${otp}`,
      html: `<h2>Your OTP is ${otp}</h2>`,
    }).catch((err) => {
      console.error("Email sending failed:", err);
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data: { email },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Registration failed",
      });
    }
  }
};



const verifyOTPAndRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // 1️⃣ Verify OTP
    await verifyOTP(email, otp, "register");

    const redisKey = `register:${email}`;
    const tempData = await redisClient.get(redisKey);

    if (!tempData) {
      return res.status(400).json({
        success: false,
        message: "Registration session expired",
      });
    }

    const { username, password } = JSON.parse(tempData);

    // 2️⃣ Create user
    const newUser = await User.create({
      username,
      email,
      password,
      isVerified: true,
    });

    await Profile.create({
  user: newUser._id,
  fullName: username
});
    await redisClient.del(redisKey);

    // 3️⃣ Ensure SECRET_KEY exists
    if (!SECRET_KEY) {
      throw new Error("JWT secret key missing in .env");
    }

    // 4️⃣ Generate token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // 5️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    // 6️⃣ Return success ONCE
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });

  } catch (error) {
    console.error("Verify error:", error.message);

    // Only send error if response not already sent
    if (!res.headersSent) {
      return res.status(400).json({
        success: false,
        message: error.message || "OTP verification failed",
      });
    }
  }
};


const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    /* ---------- VALIDATION ---------- */

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if ((username && email) || (!username && !email)) {
      return res.status(400).json({
        success: false,
        message: "Provide either username or email (not both)",
      });
    }

    /* ---------- FIND USER ---------- */

    const query = username ? { username } : { email };
    const existUser = await User.findOne(query);

    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!existUser.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    /* ---------- CHECK PASSWORD ---------- */

    const isPasswordValid = await bcrypt.compare(
      password,
      existUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /* ---------- GENERATE JWT ---------- */

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing in environment variables");
    }

    const token = jwt.sign(
      {
        id: existUser._id,
        role: existUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    /* ---------- SET COOKIE ---------- */

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    /* ---------- SUCCESS ---------- */

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: existUser._id,
        username: existUser.username,
        email: existUser.email,
        role: existUser.role,
      },
    });

  } catch (error) {
    // Minimal production-safe error log
    console.error("Login error");

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};


const resendOtp = async (req, res) => {
  try {
    const { email, type } = req.body;

    if (!email || !type) {
      return res.status(400).json({
        success: false,
        message: "Email and type are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 🔥 REGISTER FLOW
    if (type === "register") {
      const sessionKey = `register:${normalizedEmail}`;
      const session = await redisClient.get(sessionKey);

      if (!session) {
        return res.status(400).json({
          success: false,
          message: "Registration session expired. Please restart process.",
        });
      }
    }

    // 🔥 FORGOT FLOW
    if (type === "forgot") {
      const user = await User.findOne({ email: normalizedEmail });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    }

    // 🔥 UPDATE EMAIL FLOW
if (type === "updateEmail") {
  const sessionKey = `updateEmail:${normalizedEmail}`;
  const session = await redisClient.get(sessionKey);

  if (!session) {
    return res.status(400).json({
      success: false,
      message: "Email update session expired. Please restart process.",
    });
  }
}

    // 🔥 Clear old OTP + attempts + block
    await redisClient.del(`otp:${type}:${normalizedEmail}`);
    await redisClient.del(`otp_attempt:${type}:${normalizedEmail}`);
    await redisClient.del(`otp_block:${type}:${normalizedEmail}`);

    // 🔥 Generate new OTP (this stores hashed OTP automatically)
    const otp = await generateOTP(normalizedEmail, type);

    // 🔥 Send email async (don’t block response)
    sendOTP({
      to: normalizedEmail,
      subject: "StudyLoop - Resend OTP",
      text: `Your OTP is ${otp}`,
      html: `<h2>Your OTP is ${otp}</h2>`,
    }).catch(err => console.error("Email error:", err));

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });

  } catch (error) {
    console.error("Resend OTP Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { identifier } = req.body; // email OR username

    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: "Username or Email is required",
      });
    }
    // Find user by username OR email
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = await generateOTP(user.email, "forgot");

    // async email send
    sendOTP({
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`,
      html: `<h2>Your OTP is ${otp}</h2>`
    }).catch(err => console.error(err));

    return res.status(200).json({
      success: true,
      message: "OTP sent to registered email",
      data: { email: user.email }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};



const verifyForgetPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return apiResponse.error(res, {
        statusCode: 400,
        message: "Email and OTP are required"
      });
    }

    // ✅ Use same purpose
    await verifyOTP(email, otp, "forgot");

    // ✅ Allow reset session for 5 minutes
    await redisClient.setEx(
      `reset_session:${email}`,
      300,
      "ALLOWED"
    );

    return apiResponse.success(res, {
      statusCode: 200,
      message: "OTP verified successfully"
    });

  } catch (error) {
    return apiResponse.error(res, {
      statusCode: 400,
      message: error.message
    });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return apiResponse.error(res, {
        statusCode: 400,
        message: "Email and new password are required"
      });
    }

    const session = await redisClient.get(`reset_session:${email}`);

    if (!session) {
      return apiResponse.error(res, {
        statusCode: 403,
        message: "Unauthorized password reset attempt"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    await redisClient.del(`reset_session:${email}`);

    return apiResponse.success(res, {
      statusCode: 200,
      message: "Password reset successfully"
    });

  } catch (error) {
    return apiResponse.error(res, {
      statusCode: 500,
      message: error.message
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: SECRET_KEY === "production",
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });
  }
};


// const profileCheck = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       user: req.user
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// };

const editAccount = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    // ------------------------
    // EMAIL UPDATE FLOW
    // ------------------------
    if (email) {

  if (!currentPassword) {
    return res.status(400).json({
      success: false,
      message: "Current password is required"
    });
  }

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect"
    });
  }

   if (email === user.email) {
        return res.status(400).json({
          success: false,
          message: "New email cannot be same as current email"
        });
      }

  const existingUser = await User.findOne({ email });

  if (
    existingUser &&
    existingUser._id.toString() !== user._id.toString()
  ) {
    return res.status(400).json({
      success: false,
      message: "Email already exists"
    });
  }

   const otp = await generateOTP(email, "updateEmail");

  await redisClient.setEx(
    `updateEmail:${email}`,
    300,
    JSON.stringify({
      userId: user._id,
      email
    })
  );

   sendOTP({
    to: email,
    subject: "StudyLoop Email Verification",
    text: `Your OTP is ${otp}`,
    html: `<h2>Your OTP is ${otp}</h2>`
  });

  return res.status(200).json({
    success: true,
    message: "OTP sent to new email for verification"
  });
}

   // ------------------------
// PASSWORD UPDATE FLOW
// ------------------------
if (newPassword) {

  const { confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All password fields are required"
    });
  }

  // Check current password
  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect"
    });
  }

  // Check new === confirm
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match"
    });
  }

  // Prevent same password reuse
  const isSamePassword = await bcrypt.compare(
    newPassword,
    user.password
  );

  if (isSamePassword) {
    return res.status(400).json({
      success: false,
      message: "New password cannot be same as current password"
    });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully"
  });
}

  } catch (error) {
 
  return res.status(500).json({
    success: false,
    message: error.message
  });
}
};

const verifyEmailUpdate = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }
     
    // 🔥 USE YOUR CENTRAL OTP SYSTEM
    await verifyOTP(email, otp, "updateEmail");

    // Get stored update session
    const storedData = await redisClient.get(`updateEmail:${email}`);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "Session expired"
      });
    }

    const parsedData = JSON.parse(storedData);

    if (parsedData.userId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized request"
      });
    }

    // Update email in DB
    await User.findByIdAndUpdate(
  req.user._id,
  { email },
  { returnDocument: 'after' }
);

    // Clean session key
    await redisClient.del(`updateEmail:${email}`);

    return res.status(200).json({
      success: true,
      message: "Email updated successfully"
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { currentPassword } = req.body;

    console.log("REQ USER:", req.user);

    

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password is required"
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    console.log("Type currentPassword:", typeof currentPassword);
console.log("Type user.password:", typeof user.password);
console.log("user.password value:", user.password);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      });
    }

    // Delete user
    await User.deleteOne({ _id: user._id });

    // Clear cookie (match options used during login)
   res.clearCookie("token", {
  httpOnly: true,
  secure: false, // important for localhost
  sameSite: "strict"
});

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully"
    });

  } catch (error) {
   console.error("DELETE ACCOUNT ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message
    });
  }
};

// const resendResetOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return apiResponse.error(res, 400, "User not found");
//     }

//     const otp = await generateOTP(email, "forgetPassword");

//     await sendOTP({
//       to: email,
//       subject: "Resend OTP - Password Reset",
//       text: `Your OTP is ${otp}`
//     });

//     return apiResponse.success({
//       res,
//       message: "OTP resent successfully"
//     });

//   } catch (error) {
//     return apiResponse.error(res, 500, error.message);
//   }
// };



module.exports= {
    register,
    verifyOTPAndRegister,
    login,
    resendOtp,
    forgetPassword  ,
    verifyForgetPasswordOTP ,
    resetPassword,
     logoutUser,
     getCurrentUser,
    //  profileCheck,
      editAccount,
      verifyEmailUpdate,
        deleteAccount
    // resendResetOTP
}

