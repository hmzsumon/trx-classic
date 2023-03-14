import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGetMiningQuery } from '../../features/mining/miningApi';

const WalletCard03 = () => {
	const { data } = useGetMiningQuery();
	return (
		<div className='p-4 space-y-4 bg-teal-600 rounded-md'>
			<span className='text-xs font-semibold text-gray-100'>
				Invest Profit (BTC)
			</span>
			<div className='flex items-center space-x-3'>
				<h1 className='text-xl italic font-bold '>
					{data && data.mining
						? Number(data.mining.mining_profit).toFixed(8)
						: Number(0).toFixed(8)}
					$
				</h1>
				{/* <span className='text-xs font-semibold text-slate-500'>
					=$
					{data && data.mining
						? Number(mining?.mining_investment).toFixed(2)
						: Number(0).toFixed(2)}
				</span> */}
			</div>
			<div className='grid grid-cols-3 gap-4'>
				<NavLink
					to='/mining'
					className='px-3 py-2 italic font-bold text-center text-gray-800 bg-yellow-500 rounded-sm'
				>
					Start Invest
				</NavLink>
				<button
					className='px-3 py-2 italic font-bold text-center text-gray-800 bg-yellow-500 rounded-sm disabled:cursor-not-allowed'
					disabled
				>
					Withdraw
				</button>
				<NavLink
					to='/convert'
					className='px-3 py-2 italic font-bold text-center text-gray-800 bg-yellow-500 rounded-sm'
				>
					Convert
				</NavLink>
			</div>
		</div>
	);
};

export default WalletCard03;
