const Joi = require('joi');

const validateUpdate = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100),
        content: Joi.string().min(5),
        category: Joi.string().valid('Personal', 'Work', 'Solar', 'Quotes'),
        tags: Joi.array().items(Joi.string())
    }).min(1); 

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ 
            success: false, 
            message: error.details[0].message 
        });
    }

    next();
};

module.exports = validateUpdate;