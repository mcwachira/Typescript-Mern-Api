import { Request, Response } from 'express';
import { omit } from 'lodash';
import logger from '../utils/logger';
import { createUser } from '../service/user.service';
import { CreateUserInput, createUserSchema } from '../schema/user.schema';
export const createUserHandler = async (
	req: Request<{}, {}, CreateUserInput['body']>, //generic
	res: Response
) => {
	try {
		const user = await createUser(req.body); // call user service

		//does not work
		// return res.send(omit(user.toJSON()), 'password');
		return res.send(user);
	} catch (error: any) {
		logger.error(error);
		//conflict
		return res.status(409).send(error.message);
	}
};

export const getCurrentUser = async (req: Request, res: Response) => {
	return res.send(res.locals.user);
};
