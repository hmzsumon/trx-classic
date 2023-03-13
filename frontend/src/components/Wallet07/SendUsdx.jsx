import React, { useEffect, useState } from 'react';

import ButtonLoaderCircle from '../../global/ButtonLoaderCircle';
import Layout from '../Dashboard/Layout/Layout';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';

import {
	useGetUsdxDetailsQuery,
	useSendUsdxMutation,
} from '../../features/usdx/usdxApi';
import { useNavigate } from 'react-router-dom';

const SendUsdx = () => {
	const navigate = useNavigate();
	const [sendUsdx, { isLoading, isError, isSuccess }] = useSendUsdxMutation();

	const { data, isLoading: detailsLoading } = useGetUsdxDetailsQuery();
	const { usdx } = data || {};

	const [recipientId, setRecipientId] = useState('');
	const [amount, setAmount] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();

		myForm.append('usdx_id', recipientId);
		myForm.append('amount', amount);

		sendUsdx(myForm);
	};

	useEffect(() => {
		if (isError) {
			toast.error('Something went wrong');
		}
		if (isSuccess) {
			toast.success('PXC sent successfully');
			navigate('/wallets');
		}
	}, [isSuccess, isError, navigate]);
	return (
		<Layout>
			{detailsLoading ? (
				<div className='flex items-center justify-center mt-44 '>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='w-11/12 px-2 py-4 mx-auto space-y-4 rounded-md bg-slate-800 md:w-9/12'>
					<div>
						<h2 className='text-xl font-extrabold text-center text-gray-100 md:text-3xl'>
							USDX To USDX Transfer
						</h2>
					</div>

					<h3 className='py-1 text-center bg-transparent border rounded-md'>
						Your Current Balance is{' '}
						<span className='font-semibold text-green-500'>
							{Number(usdx?.usdx_balance).toFixed(2)}$
						</span>
					</h3>
					<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<span className='mb-2 text-gray-800'>
									Who do you want to send it to?
								</span>
								<input
									id='email-address'
									name='recipient'
									type='text'
									autoComplete='email'
									required
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									value={recipientId}
									onChange={(e) => setRecipientId(e.target.value)}
									placeholder='USDX ID'
								/>
							</div>
							<div>
								<label htmlFor='password' className='sr-only'>
									Amount
								</label>
								<input
									id='password'
									name='password'
									type='number'
									autoComplete='current-password'
									required
									className='relative block w-full px-3 py-2 mb-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									placeholder='Minimum amount is 1$'
								/>
							</div>
							<div className='text-center '>
								<label className='px-2 py-1 mt-2 text-xs bg-orange-300 rounded-lg'>
									Fee 0.005%
								</label>
							</div>
						</div>

						<div>
							{isLoading ? (
								<ButtonLoaderCircle />
							) : (
								<button
									type='submit'
									className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-gray-700 disabled:cursor-not-allowed '
									disabled={isLoading}
								>
									<span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
									Send
								</button>
							)}

							{usdx?.usdx_balance <= amount ? (
								<div className='mt-2 text-center'>
									<small className='font-semibold text-orange-700 capitalize'>
										{`your balance is less than ${amount} Please Deposit Or Receive
										Money`}
										.
									</small>
								</div>
							) : null}
						</div>
					</form>
				</div>
			)}
		</Layout>
	);
};

export default SendUsdx;
