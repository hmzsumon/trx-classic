import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ButtonLoaderCircle from '../../global/ButtonLoaderCircle';
import Layout from '../Dashboard/Layout/Layout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { FormControl, MenuItem, Select } from '@mui/material';
import { useCreateWithdrawMutation } from '../../features/withdraw/withdrawApi';

const CreateWithdraw = () => {
	const navigate = useNavigate();
	const [createWithdraw, { isLoading, isError, isSuccess, error }] =
		useCreateWithdrawMutation();
	const { user } = useSelector((state) => state.auth);

	const [wallet, setWallet] = useState('');

	const handleChange = (event) => {
		setWallet(event.target.value);
	};

	const [address, setAddress] = useState('');
	const [amount, setAmount] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();

		myForm.append('address', address);
		myForm.append('amount', amount);
		myForm.append('wallet', wallet);

		createWithdraw(myForm);
	};

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('Withdraw request created');
			navigate('/wallets');
		}
	}, [isSuccess, isError, error, navigate]);
	return (
		<Layout>
			<div className='w-11/12 px-2 py-4 mx-auto space-y-4 rounded-md bg-slate-800 md:w-9/12'>
				<div>
					<h2 className='text-sm font-extrabold text-center text-gray-100'>
						Trx Classic to Metamask <br /> or <br />
						Trust wallet Withdraw
					</h2>
				</div>

				<h3 className='py-1 text-xs text-center bg-transparent border rounded-md'>
					Your Current Balance is{' '}
					<span className='font-semibold text-green-500'>
						{Number(user?.pxc_balance).toFixed(8)} TRXC
					</span>
				</h3>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<FormControl fullWidth size='small'>
						<Select
							value={wallet}
							onChange={handleChange}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
						>
							<MenuItem value=''>
								<em>
									<span className='text-gray-500'>Select Wallet</span>
								</em>
							</MenuItem>
							<MenuItem value={'metamask'}>Metamask</MenuItem>
							<MenuItem value={'trust-wallet'}>Trust wallet</MenuItem>
						</Select>
					</FormControl>

					{wallet !== '' && (
						<div className='space-y-4 rounded-md shadow-sm '>
							<div>
								<input
									type='text'
									required
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none bg-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									placeholder={
										wallet === 'metamask'
											? 'Metamask TRXC Address'
											: 'Trust Wallet TRXC  Address'
									}
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
									className='relative block w-full px-3 py-2 mb-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none bg-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									placeholder='Minimum Amount : 1000 TRXC'
								/>
							</div>
							<div className='text-center '>
								<label className='px-2 py-1 mt-2 text-xs bg-orange-300 rounded-lg'>
									Fee 0.00
								</label>
							</div>
						</div>
					)}

					<div>
						{isLoading ? (
							<ButtonLoaderCircle />
						) : (
							<button
								type='submit'
								className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-gray-700 disabled:cursor-not-allowed '
								// disabled={
								// 	user.pxc_balance <= 1000 || address === '' || amount < 1000
								// }
							>
								<span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
								Withdraw Start 1 May 2023
							</button>
						)}
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default CreateWithdraw;
