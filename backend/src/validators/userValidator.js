const validator = require("validator");


exports.signUpValidator = (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid or missing email",
    });
  }


  if (
    !password ||
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      status: "error",
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    });
  }

  // ✅ Name Validation
  if (!username || username.trim().length < 2 || username.trim().length > 10) {
    return res.status(400).json({
      status: "error",
      message: "Username must be between 2 and 10 characters long",
    });
  }

 

  next();
};


exports.identifierValidator = (req, res, next) => {
  const { identifier } = req.body;

  if (!identifier) {
    return res.status(400).json({
      success: false,
      message: "Username or Email is required",
    });
  }

  next();
};

