import React, { useEffect, useState } from 'react';
import GoBack from '../../global/GoBack';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useCreateMerchantMutation } from '../../features/merchant/merchantApi';
import { BeatLoader } from 'react-spinners';

const MerchantForm = () => {
	const [createMerchant, { isLoading, isSuccess, isError, error }] =
		useCreateMerchantMutation();

	const [merchant, setMerchant] = useState({
		merchant_name: '',
		merchant_email: '',
		merchant_phone: '',
		address: '',
		country: '',
		city: '',
		state: '',
		zip: '',
	});
	const {
		merchant_name,
		merchant_email,
		merchant_phone,
		address,
		country,
		city,
		state,
		zip,
	} = merchant;
	// handle change
	const handleChange = (e) => {
		setMerchant({
			...merchant,
			[e.target.name]: e.target.value,
		});
	};

	// submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		createMerchant(merchant);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Merchant Created Successfully');
			window.location.reload();
		}

		if (isError) {
			toast.error(error.data.message);
		}
	}, [isSuccess, error, isError]);

	return (
		<div>
			<div className='p-2 mx-auto mt-10 rounded md:w-1/2 bg-slate-800'>
				<div className=''>
					<h1 className='my-4 text-sm font-bold text-center text-gray-100'>
						Apply For Merchant
					</h1>
					<div className='px-4 '>
						<p className='my-1 text-xs italic font-bold text-center text-blue-500'>
							( Present residential address ){' '}
						</p>
						<form className='space-y-3' onSubmit={handleSubmit}>
							<TextField
								id='merchant_name'
								label='Merchant Name'
								variant='outlined'
								size='small'
								type='text'
								name='merchant_name'
								value={merchant_name}
								onChange={handleChange}
								fullWidth
							/>

							<TextField
								id='merchant_email'
								label='Merchant Email'
								variant='outlined'
								size='small'
								type='text'
								name='merchant_email'
								value={merchant_email}
								onChange={handleChange}
								fullWidth
							/>

							<TextField
								id='phone'
								label='Merchant Phone'
								variant='outlined'
								size='small'
								type='text'
								name='merchant_phone'
								value={merchant_phone}
								onChange={handleChange}
								fullWidth
							/>

							<TextField
								id='address'
								label=' Address'
								variant='outlined'
								size='small'
								type='text'
								name='address'
								value={address}
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

							<button className='w-full py-2 mt-4 text-sm font-bold text-white uppercase bg-blue-500 rounded focus:outline-none hover:bg-blue-600 hover:shadow-none'>
								{isLoading ? <BeatLoader color='#000' size={10} /> : 'Submit'}
							</button>
						</form>
					</div>
					<div className='flex items-center justify-center mt-10 '>
						<GoBack />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MerchantForm;
