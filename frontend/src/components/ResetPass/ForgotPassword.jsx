import { Box, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from '../../features/auth/authApi';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../../layouts/Header/Navbar2';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const ForgotPassword = () => {
	const navigate = useNavigate();

	const [forgotPassword, { isLoading, isSuccess, isError, error }] =
		useForgotPasswordMutation();

	// captcha
	const [email, setEmail] = useState('');
	const [restBtn, setRestBtn] = useState(true);
	const [content, setContent] = useState(false);

	// form State

	const handleSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.append('email', email);
		forgotPassword(myForm);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Password Reset Link Sent To Your Email');
			setRestBtn(false);
			setContent(true);
			setTimeout(() => {
				setRestBtn(true);
			}, 3000);
		}
		if (isError) {
			toast.error(error.data.message);
		}
	}, [isSuccess, isError, error, navigate]);

	return (
		<ThemeProvider theme={darkTheme}>
			<>
				<Navbar2 />
				<div className='pt-20'>
					<div className='px-4 py-20 sign-up-wrapper '>
						{!content ? (
							<Box
								className='flex flex-col gap-4 bg-slate-800 p-4 rounded-md w-[95%] md:w-7/12 mx-auto'
								noValidate
								autoComplete='off'
							>
								<h2 className='my-4 text-2xl text-center '>Forgot Password</h2>

								<Box
									component='form'
									className='flex flex-col gap-4   rounded-md w-full  mx-auto'
									noValidate
									autoComplete='off'
									onSubmit={handleSubmit}
								>
									<TextField
										id='name'
										type='email'
										label='Enter Your Email'
										variant='outlined'
										fullWidth
										autoComplete='off'
										size='normal'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>

									<button
										className='bg-[#ffeb3b] hover:bg-[#c5b104] disabled:cursor-not-allowed font-semibold text-slate-700 py-2 rounded-md'
										disabled={isLoading || !restBtn}
									>
										{isLoading ? (
											<BeatLoader color='#000' size={10} />
										) : (
											'Submit'
										)}
									</button>
								</Box>

								{/* Show set time out */}
								{!restBtn && (
									<small className='text-center'>
										{' '}
										You can resend email verification code after 30 seconds{' '}
									</small>
								)}
							</Box>
						) : (
							<Box
								className='flex flex-col gap-4 bg-slate-800 p-4 rounded-md w-[95%] md:w-7/12 mx-auto'
								noValidate
								autoComplete='off'
							>
								<h2 className='my-4 text-2xl text-center '>
									Please Check Your Email
								</h2>
							</Box>
						)}
					</div>
				</div>
			</>
		</ThemeProvider>
	);
};

export default ForgotPassword;
