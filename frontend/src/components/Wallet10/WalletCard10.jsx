import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const WalletCard10 = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className='p-4 space-y-4 bg-gray-100 rounded-md'>
			<div className='text-center '>
				<span className='text-xs font-bold text-gray-800'>
					TRXC Classic Share
				</span>
				<div className=''>
					<h1 className='text-3xl italic font-bold text-gray-700 '>
						{user?.bonus_balance
							? Number(user?.bonus_balance).toFixed(2)
							: Number(0).toFixed(8)}{' '}
						= 0.00$
					</h1>
				</div>
				<div className='space-x-2 '>
					<button
						className='py-1 px-4 bg-orange-500 font-bold rounded text-[0.6rem] disabled:cursor-not-allowed '
						disabled
					>
						Buy
					</button>
					<button
						className='py-1 px-4 bg-green-500 font-bold rounded text-[0.6rem] disabled:cursor-not-allowed '
						disabled
					>
						Sell
					</button>
				</div>
			</div>
		</div>
	);
};

export default WalletCard10;
