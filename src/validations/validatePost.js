const Joi = require("joi");

const validatePost = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(5).required(),
    // Adding category validation
    category: Joi.string()
      .valid("Personal", "Public", "Work", "Quotes")
      .default("General"),
    tags: Joi.array().items(Joi.string()),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validatePost;
