import React from 'react';
import { NavLink } from 'react-router-dom';

import { useGetUsdxDetailsQuery } from '../../features/usdx/usdxApi';

const WalletCard02 = () => {
	const { data } = useGetUsdxDetailsQuery();
	const { usdx } = data || {};
	return (
		<div className='p-4 space-y-4 rounded-md bg-slate-800'>
			<span className='text-xs font-semibold text-slate-500'>USDX</span>
			<div className='flex items-center space-x-3'>
				<h1 className='italic '>{Number(usdx?.usdx_coin).toFixed(8)}</h1>
				<span className='text-xs font-semibold text-slate-500'>
					=${Number(usdx?.usdx_balance).toFixed(2)}
				</span>
			</div>
			<div className='grid grid-cols-3 gap-4'>
				<NavLink
					to='/usdx-withdraw'
					className='px-3 py-2 italic font-bold text-gray-800 bg-yellow-400 rounded-sm'
				>
					Withdraw
				</NavLink>
				<NavLink
					to='/send-usdx'
					className='px-3 py-2 italic font-bold text-center text-gray-400 rounded-sm bg-slate-600'
				>
					Send
				</NavLink>
				<NavLink
					to='/receive-usdx'
					className='px-3 py-2 italic font-bold text-center text-gray-400 rounded-sm bg-slate-600'
				>
					Receive
				</NavLink>
			</div>
		</div>
	);
};

export default WalletCard02;
