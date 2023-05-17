const Joi = require('joi');

export const customerUpdateSchema = Joi.object({
    update: Joi.object({
        name: Joi.string().max(30),
        gender: Joi.string().uppercase(),
        email: Joi.string().email(),
        DOB: Joi.date(),
        mobile: Joi.number(),
        address: Joi.object({
            street: Joi.string(),
            houseNo: Joi.string(),
            pincode: Joi.string(),
            state: Joi.string(),
            country: Joi.string(),
            tag: Joi.string()
        })
    }),
    filter: Joi.object({
        'providers.name': Joi.string().uppercase(),
        'providers.uid': Joi.string()
    })
});

export const generateOtpSchema = Joi.object({
    mobileNumber: Joi.string().regex(/^\d+$/).required().length(10)
});

export const validateOtpSchema = Joi.object({
    username: Joi.string().regex(/^\d+$/).required().length(10),
    password: Joi.string().regex(/^\d+$/).required().length(6)
});

