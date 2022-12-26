import { DocumentDefinition, FilterQuery } from 'mongoose';
import User, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';

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
