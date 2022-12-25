import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

//db connection
const connect = async () => {
	const dbUri = config.get<string>('dbUri');

	try {
		const connect = await mongoose.connect(dbUri);
		logger.info(
			'connected to db'
			// `MongoDb  connected ${connect.connection.host}`.blue.underline
		);
	} catch (error) {
		// console.log(`error :${error.messages}`.red.underline.bold);
		logger.error('Cannot connect to db');
		process.exit(1);
	}
};

export default connect;
