import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from 'config';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';

const createServer = () => {
	const app = express();

	app.use(
		cors({
			origin: config.get('origin'),

			//pass values in the headers
			credentials: true,
		})
	);
	app.use(cookieParser());

	app.use(express.json());

	app.use(deserializeUser);

	routes(app);

	return app;
};

export default createServer;
