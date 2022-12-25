import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash'; //enable us access a property safely without knowing about its existence
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = get(req, 'headers.authorization', '').replace(
		/^Bearer\s/,
		''
	);

	const refreshToken = get(req, 'headers.x-refresh');

	console.log(accessToken);
	if (!accessToken) {
		return next();
	}

	const { decoded, expired } = verifyJwt(accessToken);
	console.log(decoded);
	if (decoded) {
		res.locals.user = decoded;
		return next();
	}

	if (expired && refreshToken) {
		const newAccessToken = await reIssueAccessToken({ refreshToken });

		if (newAccessToken) {
			res.setHeader('x-access-token', newAccessToken);
		}

		const results = verifyJwt(newAccessToken);

		res.locals.user = results.decoded;
		next();
	}

	return next();
};

export default deserializeUser;
