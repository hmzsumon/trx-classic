import { Box, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import {
	useVerifyEmailMutation,
	useResendEmailVerificationMutation,
} from '../../features/auth/authApi';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar2 from '../../layouts/Header/Navbar2';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const EmailVerification = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const email = location.search.split('=')[1];

	const [verifyEmail, { isLoading, isSuccess, isError, error }] =
		useVerifyEmailMutation();

	const [
		resendEmailVerification,
		{
			isLoading: isLoading2,
			isSuccess: isSuccess2,
			isError: isError2,
			error: error2,
		},
	] = useResendEmailVerificationMutation();
	// captcha
	const [code, setCode] = useState('');

	const [restBtn, setRestBtn] = useState(true);

	// form State

	const handleSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.append('code', code);
		myForm.append('email', email);

		verifyEmail(myForm);
	};

	const handleResend = () => {
		setRestBtn(false);
		resendEmailVerification(email);
		setTimeout(() => {
			setRestBtn(true);
		}, 30000);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Email Verified Successfully');
			navigate('/login');
		}
		if (isError) {
			toast.error(error.data.message);
		}

		if (isSuccess2) {
			toast.success('Email Verification Code Sent');
		}
		if (isError2) {
			toast.error(error2.data.message);
		}
	}, [isSuccess, isError, error, navigate, isSuccess2, isError2, error2]);

	return (
		<ThemeProvider theme={darkTheme}>
			<>
				<Navbar2 />
				<div className='pt-20'>
					<div className='px-4 py-20 sign-up-wrapper '>
						<Box
							className='flex flex-col gap-4 bg-slate-800 p-4 rounded-md w-[95%] md:w-7/12 mx-auto'
							noValidate
							autoComplete='off'
						>
							<h2 className='my-4 text-2xl text-center '>Verify Your Email</h2>

							<small className='text-center'>
								{' '}
								Please check the email address{' '}
								<span className=' italic font-bold'>{email}</span> to verify
								Email{' '}
							</small>

							<Box
								component='form'
								className='flex flex-col gap-4   rounded-md w-full  mx-auto'
								noValidate
								autoComplete='off'
								onSubmit={handleSubmit}
							>
								<TextField
									id='name'
									type='text'
									label='Enter Your Code'
									variant='outlined'
									fullWidth
									autoComplete='off'
									size='normal'
									value={code}
									onChange={(e) => setCode(e.target.value)}
								/>

								<button
									className='bg-[#ffeb3b] hover:bg-[#c5b104] disabled:cursor-not-allowed font-semibold text-slate-700 py-2 rounded-md'
									disabled={isLoading || code.length < 6}
								>
									{isLoading ? <BeatLoader color='#000' size={10} /> : 'Submit'}
								</button>
							</Box>
							<button
								className='bg-green-500 disabled:cursor-not-allowed  font-semibold text-slate-700 py-2 rounded-md'
								onClick={handleResend}
								disabled={!restBtn}
							>
								{isLoading2 ? <BeatLoader color='#000' size={10} /> : 'Resend'}
							</button>
							{/* Show set time out */}
							{!restBtn && (
								<small className='text-center'>
									{' '}
									You can resend email verification code after 30 seconds{' '}
								</small>
							)}
						</Box>
					</div>
				</div>
			</>
		</ThemeProvider>
	);
};

export default EmailVerification;
