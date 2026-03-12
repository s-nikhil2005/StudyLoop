const express = require('express');
const userRouter = express.Router();

const { authenticate } = require('../middlewares/authMiddleware');

const { register,
    verifyOTPAndRegister,
    login,
    resendOtp,
    forgetPassword  ,
    verifyForgetPasswordOTP ,
    resetPassword,
    logoutUser,
    getCurrentUser,
    // profileCheck,
        editAccount,
        verifyEmailUpdate,
            deleteAccount
    // resendResetOTP
} = require('../controllers/userControllers');

const { signUpValidator, identifierValidator  } = require('../validators/userValidator');

userRouter.post('/register', signUpValidator, register);
userRouter.post('/verify-otp', verifyOTPAndRegister);
userRouter.post('/login', login);
userRouter.post('/resend-otp', resendOtp);
userRouter.post('/forget-password', identifierValidator, forgetPassword);
userRouter.post('/verify-forget-password-otp', verifyForgetPasswordOTP);
userRouter.patch('/reset-password', resetPassword);
userRouter.post('/logout', authenticate, logoutUser);
userRouter.get('/me', authenticate, getCurrentUser);
// userRouter.get('/profile', authenticate, profileCheck);
userRouter.patch('/edit-account', authenticate, editAccount);
userRouter.patch('/verify-email-update', authenticate, verifyEmailUpdate);
userRouter.delete('/delete-account', authenticate, deleteAccount);
// userRouter.post('/resend-reset-otp', resendResetOTP);


module.exports = userRouter;