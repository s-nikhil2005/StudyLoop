const nodemailer = require("nodemailer");
const {AUTH_MAIL_USER, AUTH_MAIL_PASS} = require("../constants");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: AUTH_MAIL_USER,
        pass: AUTH_MAIL_PASS,
    },
});

transporter.verify((error) => {
  if (error) {
    console.error("Email transporter configuration error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});


const sendOTP = async ({to, subject, text, html}) => {
  try {
    const mailOptions = {
      from: AUTH_MAIL_USER,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};


module.exports = {
    sendOTP
}