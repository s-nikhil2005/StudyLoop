const Joi = require("joi");

const editMessageSchema = Joi.object({
  text: Joi.string()
    .trim()
    .min(1)
    .max(2000)
    .required()
});

const messageIdSchema = Joi.object({
  messageId: Joi.string()
    .trim()
    .required()
});

function validateEditMessage(req, res, next) {

  const { error } = editMessageSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
}

function validateMessageId(req, res, next) {

  const { error } = messageIdSchema.validate(req.params);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
}

module.exports = {
  validateEditMessage,
  validateMessageId
};