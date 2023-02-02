const Joi = require('joi');

export const generateOtpSchema = Joi.object({
    mobileNumber: Joi.string().regex(/^\d+$/).required().length(10)
});

export const validateOtpSchema = Joi.object({
    username: Joi.string().regex(/^\d+$/).required().length(10),
    password: Joi.string().regex(/^\d+$/).required().length(6)
});

