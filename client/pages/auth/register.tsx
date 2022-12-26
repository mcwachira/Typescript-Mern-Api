import React from 'react';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {
	const {
		register,
		formState: { errors },
	} = useForm();
	return (
		<>
			<form>
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
			</form>
		</>
	);
};

export default RegisterPage;
