import { Box, TextField, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../features/auth/authApi';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const Login = () => {
	const navigate = useNavigate();
	const [login, { data, isLoading, isSuccess, isError, error }] =
		useLoginMutation();

	const { user } = data || {};
	// form State
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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

	const handleCaptcha = (e) => {
		e.preventDefault();
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
		const myForm = new FormData();
		myForm.append('email', email);
		myForm.append('password', password);
		login({ email, password });
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Login successful');
			if (user?.role === 'admin') {
				navigate('/admin/dashboard');
			} else {
				navigate('/dashboard');
			}
		}
		if (isError) {
			toast.error(error.data.message);
			if (error.data.message === 'Please verify your email') {
				navigate(`/email-verify?email=${email}`);
			}
		}
	}, [isSuccess, isError, error, navigate, user, email]);

	return (
		<ThemeProvider theme={darkTheme}>
			{isLoading ? (
				<div className='flex items-center justify-center h-80'>
					<FadeLoader color='#36d7b7' size={150} />
				</div>
			) : (
				<Box
					component='form'
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
						padding: '1rem 0',
					}}
					noValidate
					autoComplete='off'
					onSubmit={handleSubmit}
				>
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
								onClick={handleCaptcha}
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
						Sign In
					</button>
					{/* Forgot Password */}
					<Link
						to='/forgot-pass'
						className='text-blue-500 hover:text-blue-700 font-semibold text-sm'
					>
						Forgot Password?
					</Link>
				</Box>
			)}
		</ThemeProvider>
	);
};

export default Login;
