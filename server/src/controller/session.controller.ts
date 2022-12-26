import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import {
	createSession,
	findSessions,
	updateSession,
} from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';
import Session from '../models/session.model';

export const createUserSessionHandler = async (req: Request, res: Response) => {
	//Validate the user's password

	const user = await validatePassword(req.body);
	if (!user) {
		res.status(401).send('invalid user email or password');
	}
	//create a session

	// console.log(user);
	const session = await createSession(user._id, req.get('user-agent') || '');

	//crete an access token
	const accessToken = signJwt(
		{
			...user,
			session: session._id,
		},
		{
			expiresIn: config.get('accessTokenTtl'), // 15 minutes only
		}
	);

	//create a refresh token
	const refreshToken = signJwt(
		{
			...user,
			session: session._id,
		},
		{
			expiresIn: config.get('refreshTokenTtl'), // 15 minutes only
		}
	);

	//storing access token in cookie
	res.cookie('accessToken', accessToken, {
		maxAge: 90000, //15 min
		httpOnly: true, //security feature to access by http
		domain: 'localhost', //set it in config to access it via a specific domain
		path: '/',
		sameSite: 'strict',
		secure: false, //set a condition that checks for production and sets secure to true so as to access it in https
	});

	//storing access refresh token in cookie
	res.cookie('refreshToken', refreshToken, {
		maxAge: 3.154e10, //1 year
		httpOnly: true, //security feature to access by http
		domain: 'localhost', //set it in config to access it via a specific domain
		path: '/',
		sameSite: 'strict',
		secure: false, //set a condition that checks for production and sets secure to true so as to access it in https
	});

	//return an access token and refresh token
	return res.send({ accessToken, refreshToken });
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
	const userId = res.locals.user._id;
	console.log(userId);
	const sessions = await findSessions({ user: userId, valid: true });

	return res.send(sessions);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
	const sessionId = res.locals.user.session;

	await updateSession({ _id: sessionId }, { valid: false });

	return res.send({
		accessToken: null,
		refreshToken: null,
	});
};
