import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';
import User, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';
import config from 'config';
import axios from 'axios';
import qs from 'qs';
import log from '../utils/logger';
import { Request, Response } from 'express';

export const createUser = async (
	input: DocumentDefinition<
		Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
	>
) => {
	try {
		return await User.create(input);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const validatePassword = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const user = await User.findOne({ email });

	if (!user) {
		return false;
	}

	const isValid = await user.comparePassword(password);

	if (!isValid) return false;

	return omit(user.toJSON(), 'password');
};

export async function findUser(query: FilterQuery<UserDocument>) {
	return User.findOne(query).lean();
}

interface GoogleTokenResults {
	access_token: string;
	expires_in: string;
	refresh_token: string;
	scope: string;
	id_token: string;
}

export const getGoogleAuthTokens = async ({
	code,
}: {
	code: string;
}): Promise<GoogleTokenResults> => {
	const url = 'https://oauth2.googleapis.com/token';

	const values = {
		code,
		client_id: config.get('googleClientId'),
		client_secret: config.get('googleClientSecret'),
		redirect_uri: config.get('googleOauthRedirectUrl'),
		grant_type: 'authorization_code',
	};
	console.log({ values });
	try {
		const res = await axios.post<GoogleTokensResult>(
			url,
			qs.stringify(values),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		);
		return res.data;
	} catch (error: any) {
		console.error(error.response.data.error);
		log.error(error, 'Failed to fetch Google Oauth Tokens');
		throw new Error(error.message);
	}
};
interface GoogleUserResult {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
}

export async function getGoogleUser({
	id_token,
	access_token,
}): Promise<GoogleUserResult> {
	try {
		const res = await axios.get<GoogleUserResult>(
			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
			{
				headers: {
					Authorization: `Bearer ${id_token}`,
				},
			}
		);
		return res.data;
	} catch (error: any) {
		log.error(error, 'Error fetching Google user');
		throw new Error(error.message);
	}
}

export async function findAndUpdateUser(
	query: FilterQuery<UserDocument>,
	update: UpdateQuery<UserDocument>,
	options: QueryOptions = {}
) {
	return User.findOneAndUpdate(query, update, options);
}
