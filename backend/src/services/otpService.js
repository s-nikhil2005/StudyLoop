const crypto = require('crypto');
const {redisClient} = require("../config/redis");
const {OTP_VALID_TIME} = require("../constants");

const OTP_PREFIX = 'otp:';
const ATTEMPT_PREFIX = 'otp_attempt:';
const BLOCK_PREFIX = 'otp_block:';

const MAX_ATTEMPTS = 5;
const BLOCK_TIME = 300;

const hashOTP = (otp) =>{
            return crypto.createHash("sha256").update(otp).digest("hex");   
}

const generateOTP = async (email, purpose) => {
  try {
    const otp = crypto.randomInt(100000, 1000000).toString();
    await storeOTP(email, otp, purpose);
    return otp;
  } catch (error) {
    console.error("Error While Generating OTP", error);
    throw error;
  }
};


const storeOTP = async (email, otp, purpose) => {
  try {
    console.log("Store OTP is ", otp);
    const hashedOTP = hashOTP(otp);

    const otpKey = `${OTP_PREFIX}${purpose}:${email}`;
    const attemptKey = `${ATTEMPT_PREFIX}${purpose}:${email}`;

    await redisClient.del(attemptKey);

    await redisClient.setEx(otpKey, OTP_VALID_TIME, hashedOTP);

  } catch (error) {
    console.error("Error while storing OTP:", error);
    throw error;
  }
};


const getStoredOTP = async (email, purpose) => {
  try {
    const otpKey = `${OTP_PREFIX}${purpose}:${email}`;
    return await redisClient.get(otpKey);
  } catch (error) {
    console.error("Error while getting OTP:", error);
    throw error;
  }
};


const removeStoredOTP = async (email, purpose) => {
  try {
    const otpKey = `${OTP_PREFIX}${purpose}:${email}`;
    await redisClient.del(otpKey);
  } catch (error) {
    console.error("Error while removing OTP:", error);
    throw error;
  }
};


const verifyOTP = async (email, userOtp, purpose) => {
  try {
    const otpKey = `${OTP_PREFIX}${purpose}:${email}`;
    const attemptKey = `${ATTEMPT_PREFIX}${purpose}:${email}`;
    const blockKey = `${BLOCK_PREFIX}${purpose}:${email}`;

    const isBlocked = await redisClient.get(blockKey);
    if (isBlocked) {
      throw new Error("Too many attempts. Try again later.");
    }

    const storedHashedOtp = await redisClient.get(otpKey);
    if (!storedHashedOtp) {
      throw new Error("OTP expired or not found.");
    }


    const hashedUserOtp = hashOTP(userOtp);
    

    if (hashedUserOtp === storedHashedOtp) {
      await redisClient.del(otpKey);
      await redisClient.del(attemptKey);
      return true;
    }

    const attempts = await redisClient.incr(attemptKey);

    if (attempts === 1) {
      await redisClient.expire(attemptKey, OTP_VALID_TIME);
    }

    if (attempts >= MAX_ATTEMPTS) {
      await redisClient.setEx(blockKey, BLOCK_TIME, "BLOCKED");
      await redisClient.del(otpKey);
      await redisClient.del(attemptKey);

      throw new Error("Too many failed attempts. Blocked temporarily.");
    }

    throw new Error("Invalid OTP");

  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    throw error;
  }
};



module.exports = {
  generateOTP,
  storeOTP,
  getStoredOTP,
  removeStoredOTP,
  verifyOTP,
};