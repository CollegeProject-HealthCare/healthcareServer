import config from './config';
import { createLogger, format, transports } from 'winston';

const enumerateErrorFormat = format((info: any) => {
	if (info instanceof Error) {
		Object.assign(info, { message: info.stack });
	}
	return info;
});

export default createLogger({
	level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
	format: format.combine(
		enumerateErrorFormat(),
		process.env.NODE_ENV === 'production' ? format.uncolorize() : format.colorize(),
		format.splat(),
		format.printf(({ level, message }) => `${level}: ${message}`),
	),
	transports: [
		new transports.File({
			filename: `${Date.toString()}.log`,
			dirname: './../../logs',
			maxsize: 5242880,
			tailable: true,
		}),
		new transports.Console({
			stderrLevels: ['error'],
		}),
	],
});
