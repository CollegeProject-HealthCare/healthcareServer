import logger from './logger';

export default class ConfigUtils {
	private static config: any;

	static async fetchConfig() {
		try {
			// rewrite this method to get configurations from
			// distributed config management like zookeeper
			ConfigUtils.config = {
				MONGO_URI: 'mongodb+srv://tabrezshams0003:hkSaZka0L3vRyZK5@healthcare.nd6oql8.mongodb.net/healthcare?retryWrites=true&w=majority',
			};
		} catch (error) {
			logger.error(error);
		}
	}

	static async getConfig(): Promise<any> {
		return this.config;
	}
}
