import React, { useState } from 'react';
import Layout from '../Dashboard/Layout/Layout';
import GoBack from '../../global/GoBack';
import { TextField } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Address2 = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { personalInfo, address1 } = location.state;
	console.log(location.state);
	console.log('personalInfo: ', personalInfo);
	console.log('address1: ', address1);
	const [permanentAddress, setPermanentAddress] = useState({
		addressLine1: '',
		addressLine2: '',
		country: '',
		state: '',
		city: '',
		zip: '',
	});
	const { addressLine1, addressLine2, country, state, city, zip } =
		permanentAddress;
	// handle change
	const handleChange = (e) => {
		setPermanentAddress({
			...permanentAddress,
			[e.target.name]: e.target.value,
		});
	};
	// handle next
	const handleNext = () => {
		if (addressLine1 === '' || country === '' || state === '' || city === '') {
			toast.error('Please fill all the fields');
		} else {
			navigate('/loan/submission', {
				state: { personalInfo, address1, address2: permanentAddress },
			});
		}
	};
	return (
		<Layout>
			<div className='h-screen'>
				<div className='w-11/12  mx-auto p-2 md:w-1/2 rounded bg-slate-800 mt-10'>
					<div className=''>
						<h1 className='text-sm text-center my-4 font-bold text-gray-100'>
							Apply For Loan
						</h1>
						<div className='px-4 '>
							<p className='text-center my-1 text-xs text-blue-500 italic font-bold'>
								( Permanent residential address ){' '}
							</p>
							<div className='space-y-3'>
								<TextField
									id='address'
									label='Address Line 1'
									variant='outlined'
									size='small'
									type='text'
									name='addressLine1'
									value={addressLine1}
									onChange={handleChange}
									fullWidth
								/>

								<TextField
									id='address'
									label='Address Line 2 (Optional)'
									variant='outlined'
									size='small'
									type='text'
									name='addressLine2'
									value={addressLine2}
									onChange={handleChange}
									fullWidth
								/>

								<TextField
									id='country'
									label='Country'
									variant='outlined'
									size='small'
									type='text'
									name='country'
									value={country}
									onChange={handleChange}
									fullWidth
								/>

								<TextField
									id='state'
									label='State'
									variant='outlined'
									size='small'
									type='text'
									name='state'
									value={state}
									onChange={handleChange}
									fullWidth
								/>

								<TextField
									id='city'
									label='City'
									variant='outlined'
									size='small'
									type='text'
									name='city'
									value={city}
									onChange={handleChange}
									fullWidth
								/>

								<TextField
									id='zip'
									label='Zip'
									variant='outlined'
									size='small'
									type='text'
									name='zip'
									value={zip}
									onChange={handleChange}
									fullWidth
								/>

								<button
									className='w-full py-2 mt-4 text-sm font-bold text-white uppercase bg-blue-500 rounded focus:outline-none hover:bg-blue-600 hover:shadow-none'
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

export default Address2;
