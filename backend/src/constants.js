require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const SECRET_KEY = process.env.JWT_SECRET;
const AUTH_MAIL_USER = process.env.AUTH_MAIL_USER;
const AUTH_MAIL_PASS = process.env.AUTH_MAIL_PASS;
const allowedOrigins = [process.env.CORS_ORIGIN];
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const OTP_VALID_TIME = 300;

module.exports = {
    PORT,
    MONGO_URI,
    DB_NAME,
    SECRET_KEY,
    allowedOrigins,
    OTP_VALID_TIME,
    AUTH_MAIL_USER,
    AUTH_MAIL_PASS,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET

}