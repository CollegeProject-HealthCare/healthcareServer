require('dotenv').config();
import mongoose, { connect } from 'mongoose';
import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './config/server-config';
import logger from './utils/logger';
import OTPRoutes from './routes/otp-routes';
import passport from 'passport';
import { UserOtpStrategy } from './strategies/otp';

mongoose.set('strictQuery', false);
connect(process.env.MONGO_URI || 'mongo', (err) => {
	if (err) throw Error('Cannot connected to db');
	else logger.info('Successfully connected to db');
});

// Create an express server
const app: Express = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

passport.use('userOtp', UserOtpStrategy);
app.use('/auth/userOtp/', OTPRoutes);

// app.listen(PORT, () => {
//   logger.info(`Application listening on http://localhost:${PORT}`);
// })

try {
	app.listen(PORT, () => {
		logger.info(`Application listening on http://localhost:${PORT}`);
	});
} catch (error) {
	logger.error('An error occured while starting the server');
	throw new Error('An error occured while starting the server');
}
