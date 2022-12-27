import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from 'config';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';
import { starrMetricsServer, restResponseTimeHistogram } from './metrics';
import responseTime from 'response-time';
import swaggerDocs from './swagger';

const createServer = () => {
	const app = express();

	const port = config.get<number>('port');

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

	app.use(
		responseTime((req: Request, res: Response, time: number) => {
			if (req?.route?.path) {
				restResponseTimeHistogram.observe(
					{
						method: req.method,
						route: req.route.path,
						status_code: res.statusCode,
					},
					time * 1000
				);
			}
		})
	);

	routes(app);

	starrMetricsServer();

	swaggerDocs(app, port);

	return app;
};

export default createServer;
