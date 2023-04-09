import { Box, TextField, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useRegisterWithReferrerMutation } from '../../../features/auth/authApi';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../../layouts/Layout';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const SignUpWithReferr = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const referId = location.search.split('=')[1];

	const [registerWithReferrer, { data, isLoading, isSuccess, isError, error }] =
		useRegisterWithReferrerMutation();

	const { user } = data || {};
	// captcha
	const [number1, setNumber1] = useState('');
	const [number2, setNumber2] = useState('');
	const [result, setResult] = useState('');
	const [passLogIn, setPassLogIn] = useState(false);
	useEffect(() => {
		const number1 = Math.floor(Math.random() * 100);
		const number2 = Math.floor(Math.random() * 100);
		setNumber1(number1);
		setNumber2(number2);
	}, []);

	// form State

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNum, setPhoneNum] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleCaptch = (e) => {
		if (parseInt(result) === number1 + number2) {
			toast.success('Correct answer');
			setPassLogIn(true);
		} else {
			toast.error('Wrong answer');
			return;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Password do not match');
			return;
		}

		const myForm = new FormData();
		myForm.append('name', name);
		myForm.append('email', email);
		myForm.append('phone_number', phoneNum);
		myForm.append('password', password);

		registerWithReferrer({ body: myForm, referrerCode: referId });
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Registration Successful');
			navigate('/dashboard');
		}
		if (isError) {
			toast.error(error.data.message);
		}
	}, [isSuccess, isError, error, navigate, user]);

	return (
		<ThemeProvider theme={darkTheme}>
			<Layout>
				<div className='px-4 py-20 sign-up-wrapper '>
					<Box
						component='form'
						className='flex flex-col gap-4 bg-slate-800 p-4 rounded-md w-[95%] md:w-7/12 mx-auto'
						noValidate
						autoComplete='off'
						onSubmit={handleSubmit}
					>
						<h2 className='my-4 text-2xl text-center '>Sign Up</h2>

						<TextField
							id='name'
							type='text'
							label='Full Name'
							variant='outlined'
							fullWidth
							autoComplete='off'
							size='normal'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<TextField
							id='email'
							type='text'
							label='Email'
							variant='outlined'
							fullWidth
							autoComplete='off'
							size='normal'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<TextField
							id='phone'
							type='text'
							label='Phone Number'
							variant='outlined'
							fullWidth
							autoComplete='off'
							size='normal'
							value={phoneNum}
							onChange={(e) => setPhoneNum(e.target.value)}
						/>
						<TextField
							id='password'
							label='Password'
							type='password'
							variant='outlined'
							fullWidth
							autoComplete='off'
							size='normal'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<TextField
							id='confirmPassword'
							label='Confirm Password'
							type='password'
							variant='outlined'
							fullWidth
							autoComplete='off'
							size='normal'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<div className='grid gap-2 list-none md:grid-cols-3 '>
							<li className='gap-2 px-2 py-1 bg-white border rounded-md text-slate-800 '>
								<span>
									{' '}
									{number1} + {number2} = ?
								</span>
							</li>
							<li>
								<input
									className='w-full px-2 py-2 rounded-md text-slate-800 '
									type='number'
									value={result}
									placeholder='Result'
									onChange={(e) => setResult(e.target.value)}
								/>
							</li>
							<li>
								<Button
									variant='contained'
									onClick={handleCaptch}
									sx={{ width: '100%' }}
								>
									Submit
								</Button>
							</li>
						</div>
						<button
							className='bg-[#ffeb3b] hover:bg-[#c5b104] disabled:cursor-not-allowed font-semibold text-slate-700 py-2 rounded-md'
							disabled={!passLogIn}
						>
							{isLoading ? <BeatLoader color='#000' size={10} /> : 'Sign Up'}
						</button>
					</Box>
				</div>
			</Layout>
		</ThemeProvider>
	);
};

export default SignUpWithReferr;
