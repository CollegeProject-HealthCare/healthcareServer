import { Router, Request, Response, NextFunction } from 'express';

import passport from 'passport';
import { generateOTPController } from '../controller/otp-controller';
// import { generateOTPSchema, requestSchemaOTP } from '../joi-schemas/requestMiddleware';
import { ErrorCode, HandyManError } from '../utils/error';
import logger from '../utils/logger';

const OTPRouter: Router = Router();

OTPRouter.post('/generate-otp', generateOTPController);

OTPRouter.post(
	'/userlogin',
	passport.authenticate('userOtp', { session: false, failWithError: true }),
	async (req: Request, res: Response, next: NextFunction) => {
		return res.json({ user: req.user });
	},
	async (error: any, req: Request, res: Response, next: NextFunction) => {
		logger.error(error.message);
		if (error instanceof HandyManError && error.code === ErrorCode.BAD_DATA) {
			res.status(400).json({ message: error.message });
			return;
		} else if (error.isJoi === true) {
			res.status(400).send({
				message: error.message,
			});
			return;
		}
		res.status(500).json({
			message: 'Server Error',
		});
		res.send(req.body.user);
	},
);

export default OTPRouter;
