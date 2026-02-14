import Joi from 'joi';

export const userRegistration = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required().min(6).max(15),
    number: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.pattern.base": "Number must be 10 digits",
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address"
        }),
});

export const userLogin = Joi.object({
    password: Joi.string().required().min(6).max(15),
    email: Joi.string().email().required(),
});

export const getUserDetails = Joi.object({
    userId: Joi.string()
        .uuid({ version: "uuidv4" })
        .required()
        .messages({
            "string.guid": "Invalid UUID format",
            "any.required": "ID is required",
        }),
});

