import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const WalletCard01 = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className='p-4 space-y-4 rounded-md bg-slate-800'>
			<span className='text-xs font-semibold text-slate-500'>Payunx Coin</span>
			<div className='flex items-center space-x-3'>
				<h1 className='italic '>{Number(user?.PXC_balance).toFixed(8)}</h1>
				<span className='text-xs font-semibold text-slate-500'>
					=${Number(user?.balance).toFixed(2)}
				</span>
			</div>
			<div className='grid grid-cols-3 gap-4'>
				<NavLink
					to='/buy-PXC'
					className='px-3 py-2 text-center italic font-bold text-gray-800 bg-yellow-400 rounded-sm'
				>
					Buy PXC
				</NavLink>
				<NavLink
					to='/send'
					className='w-full px-3 py-2 italic font-bold text-center text-gray-400 rounded-sm bg-slate-600'
				>
					Send
				</NavLink>
				<NavLink
					to='/receive'
					className='w-full px-3 py-2 italic font-bold text-center text-gray-400 rounded-sm bg-slate-600'
				>
					Receive
				</NavLink>
			</div>
		</div>
	);
};

export default WalletCard01;
