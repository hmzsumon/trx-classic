import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ButtonLoaderCircle from '../../global/ButtonLoaderCircle';
import Layout from '../Dashboard/Layout/Layout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
	useConvertMiningMutation,
	useGetMiningQuery,
} from '../../features/mining/miningApi';

const Convert = () => {
	const navigate = useNavigate();
	const { data } = useGetMiningQuery();
	const { mining } = data || {};
	console.log('mining', mining);
	const [convertMining, { isLoading, isError, isSuccess, error }] =
		useConvertMiningMutation();
	const { user } = useSelector((state) => state.auth);
	console.log(user);
	const [amount, setAmount] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.append('amount', amount);

		convertMining(myForm);
	};

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('PXC sent successfully');
			navigate('/wallets');
		}
	}, [isSuccess, isError, error, navigate]);
	return (
		<Layout>
			<div className='w-11/12 px-2 py-4 mx-auto space-y-4 rounded-md bg-slate-800 md:w-9/12'>
				<div>
					<h2 className='text-sm font-extrabold text-center text-gray-100 md:text-3xl'>
						Bitcoin to TRX Classic
					</h2>
				</div>

				<h3 className='py-1 text-sm text-center bg-transparent border rounded-md'>
					Your Current Balance is{' '}
					<span className='font-semibold text-green-500'>
						{Number(mining?.mining_profit).toFixed(2)}$
					</span>
				</h3>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<input type='hidden' name='remember' defaultValue='true' />
					<div className='-space-y-px rounded-md shadow-sm'>
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
								placeholder='Minimum amount is 10$'
							/>
						</div>
						<div className='text-center '>
							<label className='px-2 py-1 mt-2 text-xs bg-orange-300 rounded-lg'>
								Fee 2.00$
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
								Convert
							</button>
						)}

						{/* {user.mining_profit <= 17 ? (
							<div className='mt-2 text-center'>
								<small className='font-semibold text-orange-700 capitalize'>
									{' '}
									your balance is less than 2.00$ Please Deposit Or Receive
									Money.{' '}
								</small>
							</div>
						) : null} */}
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default Convert;
