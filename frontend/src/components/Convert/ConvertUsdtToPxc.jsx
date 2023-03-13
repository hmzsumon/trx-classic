import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ButtonLoaderCircle from '../../global/ButtonLoaderCircle';
import Layout from '../Dashboard/Layout/Layout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useConvertUsdtToPXCMutation } from '../../features/usdt/usdtApi';

const ConvertUsdtToPXC = () => {
	const navigate = useNavigate();

	const [convertUsdtToPXC, { isLoading, isError, isSuccess, error }] =
		useConvertUsdtToPXCMutation();
	const { user } = useSelector((state) => state.auth);

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
					<h2 className='text-xl font-extrabold text-center text-gray-100 md:text-3xl'>
						USDT to PXC Coin
					</h2>
					<p className='mt-1 text-xs italic font-bold text-center text-yellow-500 '>
						25% of bonus account must be deposit on Payunx Coin account.
					</p>
				</div>

				<h3 className='py-1 text-center bg-transparent border rounded-md'>
					Your USDT Balance is{' '}
					<span className='font-semibold text-green-500'>
						{Number(user?.bonus_balance).toFixed(2)}$
					</span>
				</h3>
				<div className='mt-8 space-y-6'>
					<div>
						{isLoading ? (
							<ButtonLoaderCircle />
						) : (
							<button
								onClick={() => convertUsdtToPXC()}
								className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-gray-700 disabled:cursor-not-allowed '
								disabled={isLoading || user?.bonus_balance <= 0}
							>
								<span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
								Convert
							</button>
						)}

						{/* <div className='mt-2 text-center'>
							<small className='font-semibold capitalize'>
								{' '}
								Help To Deposit or Buy: WhatsApp No - +13369157846
							</small>
						</div> */}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ConvertUsdtToPXC;
