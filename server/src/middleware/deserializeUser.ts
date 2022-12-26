import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash'; //enable us access a property safely without knowing about its existence
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken =
		get(req, 'cookies.accessToken') ||
		get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

	console.log(accessToken);

	const refreshToken =
		get(req, 'cookies.refreshToken') || get(req, 'headers.x-refresh');

	if (!accessToken) {
		return next();
	}

	const { decoded, expired } = verifyJwt(accessToken);

	if (decoded) {
		res.locals.user = decoded;
		return next();
	}

	if (expired && refreshToken) {
		const newAccessToken = await reIssueAccessToken({ refreshToken });

		if (newAccessToken) {
			res.setHeader('x-access-token', newAccessToken);
			res.cookie('accessToken', newAccessToken, {
				maxAge: 90000, //15 min
				httpOnly: true, //security feature to access by http
				domain: 'localhost', //set it in config to access it via a specific domain
				path: '/',
				sameSite: 'strict',
				secure: false, //set a condition that checks for production and sets secure to true so as to access it in https
			});
		}

		const result = verifyJwt(newAccessToken as string);

		res.locals.user = result.decoded;
		return next();
	}

	return next();
};

export default deserializeUser;
