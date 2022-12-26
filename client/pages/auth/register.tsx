import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import Router from 'next/router';

const createUserSchema = object({
	name: string().nonempty({
		message: 'Name is required',
	}),
	password: string()
		.min(6, 'Password too short - should be 6 chars minimum')
		.nonempty({ message: 'Password is required' }),
	passwordConfirmation: string().nonempty({ message: 'confirm is required' }),
	email: string()
		.email('Not a valid email')
		.nonempty({ message: 'Email is required' }),
}).refine((data) => data.password === data.passwordConfirmation, {
	message: 'Passwords do not match',
	path: ['passwordConfirmation'],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;
const RegisterPage = () => {
	const [registerError, setRegisterError] = useState(null);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<CreateUserInput>({
		//importance of zod resolver
		resolver: zodResolver(createUserSchema),
	});

	const onSubmit = async (values: CreateUserInput) => {
		console.log({ values });

		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
				values
			);

			Router.push('/');
		} catch (error: any) {
			setRegisterError(error.message);
			console.log(error);
		}
	};

	console.log(errors);
	return (
		<>
			<p>{registerError}</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='form-element'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						id='name'
						placeholder='janedoe'
						{...register('name')}
					/>
					<p>{errors.name?.message}</p>
				</div>

				<div className='form-element'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						placeholder='janedoe@gmail.com'
						{...register('email')}
					/>
					<p>{errors.email?.message}</p>
				</div>

				<div className='form-element'>
					<label htmlFor='password'>Password</label>
					<input type='password' id='password' {...register('password')} />
					<p>{errors.password?.message}</p>
				</div>

				<div className='form-element'>
					<label htmlFor='passwordConfirmation'>Confirm Password</label>
					<input
						type='password'
						id='passwordConfirmation'
						{...register('passwordConfirmation')}
					/>
					<p>{errors.password?.message}</p>
				</div>

				<button type='submit'>Submit</button>
			</form>
		</>
	);
};

export default RegisterPage;
