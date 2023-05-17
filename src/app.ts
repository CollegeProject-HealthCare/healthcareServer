import express, { Express } from 'express';
import passport from 'passport';
import morgan from 'morgan';

import OTPRoutes from './routes/otp-routes';
import { UserOtpStrategy } from './strategies/otp';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './docs/handyman-spec.json';
// import { requestSchemaCheck } from './joi-schemas/requestMiddleware';
import logger from './utils/logger';
import cors from 'cors';
import mongoose from 'mongoose';
const app: Express = express();

if (process.env.NODE_ENV === 'development') {
	// app.use('/api-docs', swaggerUi.serve);
	// app.get(
	// 	'/api-docs',
	// 	swaggerUi.setup(swaggerDocument, {
	// 		explorer: true,
	// 	}),
	// );
	// app.set('view engine', 'ejs');
	// app.use('/static', exampleRoutes);
}
mongoose.set('strictQuery', false);
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/auth/userOtp/', OTPRoutes);
passport.use('userOtp', UserOtpStrategy);

export default async () => {
	try {
		app.listen(4000, () => {
			logger.info('Application listening on http://localhost:4000');
		});
	} catch (error) {
		logger.error('An error occured while starting the server');
		throw new Error('An error occured while starting the server');
	}
};
