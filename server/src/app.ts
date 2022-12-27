import express from 'express';

import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import createServer from './utils/server';

//gets port number from config file

const port = config.get<number>('port');

const app = createServer();

// app.use(express.json());
// app.use(deserializeUser);

// app.use(cors());

app.listen(port, async () => {
	await connect();
	logger.info(`hello app running on port ${port}`);
});
