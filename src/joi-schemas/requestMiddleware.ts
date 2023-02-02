import { NextFunction, Request, Response } from 'express';
import { validateOtpSchema, generateOtpSchema } from './requestSchema';


export const requestSchemaOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validateOtpSchema.validateAsync(req.body);
        next();
    }
    catch (error: any) {
        if (error.isJoi === true) {
            res.status(400).send(error.message);
            return;
        }
        else {
            res.status(500).send({
                message: error.message
            })
        }
    }
};

export const generateOTPSchema = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await generateOtpSchema.validateAsync(req.body);
        next();
    }
    catch (error: any) {
        if (error.isJoi === true) {
            res.status(400).send(error.message);
            return;
        }
        else {
            res.status(500).send({
                message: error.message
            })
        }
    }
};

