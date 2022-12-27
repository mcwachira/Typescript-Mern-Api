import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
//resolve json module from importing a json file to node
import { version } from '../../package.json'; //version for the docs
import log from './logger';

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'TYPESCRIPT REST API DOCS',
			version,
			//when you update you package.json the version will change
		},

		components: {
			securitySchemas: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	//the apis we want in our swagger docs
	apis: ['./src/routes.ts', './src/schema/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
	//swagger page

	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	//Docs in JSON format

	app.get('docs.json', (req: Request, res: Response) => {
		res.setHeader('Content-type', 'application/json');
		res.send(swaggerSpec);
	});

	log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
