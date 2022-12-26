import Session from '../models/session.model';
import { SessionDocument } from '../models/session.model';
import { get } from 'lodash';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';
import config from 'config';
import { FilterQuery, UpdateQuery } from 'mongoose';

export async function createSession(userId: string, userAgent: string) {
	const session = await Session.create({ user: userId, userAgent });

	return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
	return Session.find(query).lean();
}

export async function updateSession(
	query: FilterQuery<SessionDocument>,
	update: UpdateQuery<SessionDocument>
) {
	return Session.updateOne(query, update);
}

export async function reIssueAccessToken({
	refreshToken,
}: {
	refreshToken: string;
}) {
	const decoded = verifyJwt(refreshToken);

	if (!decoded || !get(decoded, 'session')) return false;
	const session = await Session.findById(get(decoded, 'session'));

	if (!session || session.valid) return false;

	const user = await findUser({ _id: session.user });
	if (!user) return false;

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

	return accessToken;
}
