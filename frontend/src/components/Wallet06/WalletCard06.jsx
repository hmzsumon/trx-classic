import React from 'react';
import { NavLink } from 'react-router-dom';

import { useGetUsdxDetailsQuery } from '../../features/usdx/usdxApi';

const WalletCard06 = () => {
	const { data } = useGetUsdxDetailsQuery();
	const { usdx } = data || {};
	return (
		<div className='p-4 space-y-4 bg-teal-600 rounded-md'>
			<div className='flex items-center '>
				<img src='/images/trx.jpg' alt='' className='w-4' />
				<span className='text-xs font-semibold text-gray-100'>TRX (Tron)</span>
			</div>

			<div className='flex items-center space-x-3'>
				<h1 className='italic '>
					{usdx?.usdx_balance ? Number(0).toFixed(2) : Number(0).toFixed(2)}$
				</h1>
			</div>
			<div className='grid grid-cols-3 gap-4 text-[0.6rem] md:text-sm'>
				<button
					className='px-3 py-2 italic font-bold text-center text-gray-100 bg-yellow-600 rounded-sm disabled:cursor-not-allowed'
					disabled
				>
					Transfer
				</button>
				<button
					className='px-3 py-2 italic font-bold text-center text-gray-100 bg-yellow-600 rounded-sm disabled:cursor-not-allowed'
					disabled
				>
					Withdraw
				</button>

				<button
					className='px-3 py-2 italic font-bold text-center text-gray-100 bg-yellow-600 rounded-sm disabled:cursor-not-allowed'
					disabled
				>
					Deposit
				</button>
			</div>
		</div>
	);
};

export default WalletCard06;
