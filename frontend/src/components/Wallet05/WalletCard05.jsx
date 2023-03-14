import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const WalletCard05 = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className='p-4 space-y-4 bg-teal-600 rounded-md'>
			<span className='text-xs font-semibold text-gray-100'>Loan Balance</span>
			<div className='flex items-center space-x-3'>
				<h1 className='text-xl italic font-bold '>
					{user?.loan_balance
						? Number(user?.loan_balance).toFixed(2)
						: Number(0).toFixed(2)}
					$
				</h1>
			</div>
			{/* <div className='text-center '>
				<h1 className='italic font-bold text-center text-yellow-500 '>
					( Convert Expire: 15-01-2023 12:00 PM )
				</h1>
				<span className='text-xs italic font-bold text-center text-green-500'>
					If you don't convert before January 15, the bonus will be 0
				</span>
			</div> */}
			<div className='grid grid-cols-2 gap-4'>
				<NavLink
					to='/loan'
					className='px-3 py-2 italic font-bold text-center bg-yellow-500 rounded-sm text-slate-800 hover:bg-yellow-600 disabled:cursor-not-allowed'
					disabled
				>
					Apply Loan
				</NavLink>
				<NavLink
					to='/mining'
					className='px-3 py-2 italic font-bold text-center text-gray-800 bg-yellow-500 rounded-sm disabled:cursor-not-allowed'
					disabled
				>
					Start Invest
				</NavLink>
			</div>
		</div>
	);
};

export default WalletCard05;
