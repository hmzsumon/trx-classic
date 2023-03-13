import React, { useState } from 'react';
import Layout from '../Dashboard/Layout/Layout';
import GoBack from '../../global/GoBack';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Loan = () => {
	const navigate = useNavigate();
	const [personalDetails, setPersonalDetails] = useState({
		fullName: '',
		fatherName: '',
		motherName: '',
		phone: '',
		email: '',
		occupation: '',
		nid: '',
	});
	const { fatherName, fullName, motherName, phone, email, occupation, nid } =
		personalDetails;
	// handle change
	const handleChange = (e) => {
		setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
	};

	// handle next
	const handleNext = () => {
		// check if all fields are filled
		if (
			fullName === '' ||
			fatherName === '' ||
			motherName === '' ||
			phone === '' ||
			email === '' ||
			occupation === ''
		) {
			toast.error('All fields are required');
		} else {
			navigate('/loan/address-1', { state: { personalInfo: personalDetails } });
		}
	};
	return (
		<Layout>
			<div>
				<div className='w-11/12 p-2 mx-auto mt-10 rounded md:w-1/2 bg-slate-800'>
					<div className=''>
						<h1 className='my-4 text-sm font-bold text-center text-gray-100'>
							Apply For Loan
							<span>Amount 1000$</span>
						</h1>
						<div className='px-4 '>
							<p className='my-1 text-xs italic font-bold text-center text-blue-500'>
								( Personal Information ){' '}
							</p>
							<div className='space-y-3'>
								<TextField
									id='full-name'
									label='Full Name'
									variant='outlined'
									size='small'
									type='text'
									className='w-full'
									autoComplete='off'
									name='fullName'
									value={fullName}
									onChange={(e) => handleChange(e)}
								/>

								<TextField
									id='father-name'
									label='Father Name'
									variant='outlined'
									size='small'
									type='text'
									className='w-full'
									name='fatherName'
									value={fatherName}
									onChange={handleChange}
								/>
								<TextField
									id='mother-name'
									label='Mother Name'
									variant='outlined'
									size='small'
									type='text'
									className='w-full'
									name='motherName'
									value={motherName}
									onChange={handleChange}
								/>
								<TextField
									id='occupation'
									label='Email'
									variant='outlined'
									size='small'
									type='email'
									className='w-full'
									name='email'
									value={email}
									onChange={handleChange}
								/>
								<TextField
									id='phone'
									label='Phone'
									variant='outlined'
									size='small'
									type='phone'
									className='w-full'
									name='phone'
									value={phone}
									onChange={handleChange}
								/>
								<TextField
									id='outlined-basic'
									label='NID/Passport No'
									variant='outlined'
									size='small'
									type='text'
									className='w-full'
									name='nid'
									value={nid}
									onChange={handleChange}
								/>
								<TextField
									id='outlined-basic'
									label='Occupation'
									variant='outlined'
									size='small'
									type='text'
									className='w-full'
									name='occupation'
									value={occupation}
									onChange={handleChange}
								/>
								<button
									className='w-full py-1 bg-green-500 rounded-md'
									onClick={handleNext}
								>
									Next
								</button>
							</div>
						</div>
						<div className='flex items-center justify-center mt-10 '>
							<GoBack />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Loan;
