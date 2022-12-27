import { Express, Request, Response } from 'express';
import {
	createUserHandler,
	getCurrentUser,
} from './controller/user.controller';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import {
	createUserSessionHandler,
	getUserSessionHandler,
} from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './middleware/requireUser';
import {
	deleteSessionHandler,
	googleOauthHandler,
} from './controller/session.controller';
import {
	createProductSchema,
	deleteProductSchema,
	getProductSchema,
	updateProductSchema,
} from './schema/product.schema';
import {
	createProductHandler,
	deleteProductHandler,
	getProductHandler,
	updateProductHandler,
} from './controller/product.controller';
const routes = (app: Express) => {
	app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
	app.post('/api/users', validateResource(createUserSchema), createUserHandler);
	app.get('/api/me', requireUser, getCurrentUser);
	app.post(
		'/api/sessions',
		validateResource(createSessionSchema),
		createUserSessionHandler
	);
	app.get('/api/sessions', requireUser, getUserSessionHandler);
	app.delete('/api/sessions', requireUser, deleteSessionHandler);

	app.get('/api/sessions/oauth/google', googleOauthHandler);
	app.post(
		'/api/products',
		[requireUser, validateResource(createProductSchema)],
		createProductHandler
	);

	app.put(
		'/api/products/:productId',
		[requireUser, validateResource(updateProductSchema)],
		updateProductHandler
	);

	app.get(
		'/api/products/:productId',
		validateResource(getProductSchema),
		getProductHandler
	);

	app.delete(
		'/api/products/:productId',
		[requireUser, validateResource(deleteProductSchema)],
		deleteProductHandler
	);
};

export default routes;
