import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import Router from 'next/router';

const createSessionSchema = object({
	email: string()
		.email('Not a valid email')
		.nonempty({ message: 'Email is required' }),
	password: string().nonempty({ message: 'Password is required' }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;
const LoginPage = () => {
	const [loginError, setLoginError] = useState(null);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<CreateSessionInput>({
		//importance of zod resolver
		resolver: zodResolver(createSessionSchema),
	});

	const onSubmit = async (values: CreateSessionInput) => {
		console.log({ values });

		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
				values,
				{ withCredentials: true }
			);

			Router.push('/');
		} catch (error: any) {
			setLoginError(error.message);
			console.log(error);
		}
	};

	console.log(errors);
	return (
		<>
			<p>{loginError}</p>
			<form onSubmit={handleSubmit(onSubmit)}>
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

				<button type='submit'>Submit</button>
			</form>
		</>
	);
};

export default LoginPage;
