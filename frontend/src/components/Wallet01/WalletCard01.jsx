import React from 'react';
import { NavLink } from 'react-router-dom';

const WalletCard01 = ({ user }) => {
	return (
		<div className='p-4 space-y-4 bg-teal-600 rounded-md'>
			<div className='flex items-center '>
				<img src='/images/trx1.png' alt='' className='w-5' />
				<span className='text-xs font-semibold text-gray-100'>
					TRX Classic (Tron)
				</span>
			</div>
			<div className='flex items-center space-x-3'>
				<h1 className='italic '>
					{user?.PXC_balance
						? Number(user?.PXC_balance).toFixed(8)
						: Number(0).toFixed(8)}
				</h1>
				<span className='text-xs font-semibold text-gray-100'>
					= $
					{user?.balance
						? Number(user?.balance).toFixed(2)
						: Number(0).toFixed(2)}
				</span>
			</div>
			<div className='grid grid-cols-3 gap-4'>
				<NavLink
					to='/buy-PXC'
					className='px-3 py-2 italic font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Buy TRXC
				</NavLink>
				<NavLink
					to='/send'
					className='w-full px-3 py-2 italic font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Withdraw
				</NavLink>
				<NavLink
					to='/receive'
					className='w-full px-3 py-2 italic font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Deposit
				</NavLink>
			</div>
		</div>
	);
};

export default WalletCard01;
