import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const WalletCard10 = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className='p-4 space-y-4 bg-teal-600 rounded-md'>
			<div className='text-center '>
				<span className='text-xs font-bold text-gray-100'>
					TRX Classic Share
					<span className='text-[0.5rem]'> (1 TRXC = 150$)</span>
				</span>
				<div className=''>
					<h1 className='text-xl italic font-bold text-gray-100 '>
						{user?.bonus_balance ? Number(0).toFixed(0) : Number(0).toFixed(0)}{' '}
						= 0.00$
					</h1>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-4 text-[0.6rem] md:text-sm'>
				<button
					className='px-3 py-2 italic font-bold text-center bg-yellow-500 rounded-sm text-slate-800 hover:bg-yellow-600 disabled:cursor-not-allowed'
					disabled
				>
					Buy
				</button>
				<button
					className='px-3 py-2 italic font-bold text-center text-gray-800 bg-yellow-500 rounded-sm disabled:cursor-not-allowed'
					disabled
				>
					Sell
				</button>
			</div>
		</div>
	);
};

export default WalletCard10;
