import express, { Request, Response } from 'express';
import client from 'prom-client';
import log from './logger';

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
	name: 'rest_response_time_duration_seconds',
	help: 'REST API response time in seconds',
	labelNames: ['method', 'route', 'status_code'],
});

export const dataBaseResponseTimeHistogram = new client.Histogram({
	name: 'db_response_time_duration_seconds',
	help: 'DATABASE API response time in seconds',
	labelNames: ['operation', 'success'],
});
export const starrMetricsServer = () => {
	const collectDefaultMetrics = client.collectDefaultMetrics;

	collectDefaultMetrics();

	app.get('/metrics', async (req: Request, res: Response) => {
		res.set('content-Type', client.register.contentType);
		return res.send(await client.register.metrics());
	});
	app.listen(9100, () => {
		log.info('Metrics server started at http://localhost:9100');
	});
};
