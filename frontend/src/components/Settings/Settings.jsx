import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Dashboard/Layout/Layout';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { Box, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../features/auth/authApi';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
	const [register, { data, isLoading, isSuccess, isError, error }] =
		useRegisterMutation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNum, setPhoneNum] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

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

		register(myForm);
	};
	return (
		<Layout>
			<div className='pb-10'>
				<div className='w-11/12 p-2 mx-auto mt-10 rounded md:w-1/2 bg-slate-800'>
					<div className='flex flex-col space-y-5 '>
						<h1 className='text-2xl font-bold text-center text-gray-100'>
							Residential Address
						</h1>
						<div>
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
									id='name'
									type='text'
									label='Address Line 1'
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
									label='Address Line 2'
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
									label='Country'
									variant='outlined'
									fullWidth
									autoComplete='off'
									size='normal'
									value={phoneNum}
									onChange={(e) => setPhoneNum(e.target.value)}
								/>
								<TextField
									id='city'
									label='Town/City'
									type='text'
									variant='outlined'
									fullWidth
									autoComplete='off'
									size='normal'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>

								<TextField
									id='state'
									label='State/Region'
									type='text'
									variant='outlined'
									fullWidth
									autoComplete='off'
									size='normal'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>

								<TextField
									id='state'
									label='Postcode'
									type='text'
									variant='outlined'
									fullWidth
									autoComplete='off'
									size='normal'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>

								<button
									className='bg-[#ffeb3b] hover:bg-[#c5b104] disabled:cursor-not-allowed font-semibold text-slate-700 py-2 rounded-md'
									disabled
								>
									{isLoading ? <BeatLoader color='#000' size={10} /> : 'Update'}
								</button>
							</Box>
						</div>
						<Link to='/dashboard' className='flex space-x-2 text-green-500 '>
							<span>
								<BsArrowLeftSquare className='text-2xl text-green-500' />
							</span>
							<span>Go Back</span>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Settings;
