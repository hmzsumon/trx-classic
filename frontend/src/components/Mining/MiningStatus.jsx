import React from 'react';
import { useGetMiningQuery } from '../../features/mining/miningApi';
import bitImg from '../../assets/mining/bit.png';

const MiningStatus = () => {
	const { data } = useGetMiningQuery();
	const { mining } = data || {};

	return (
		<div className='rounded-md bg-slate-800'>
			<div className='flex items-center justify-between px-4 py-2 mx-2 my-4 shadow-md'>
				<div className='flex items-center space-x-2'>
					<img src={bitImg} alt='Mining' className='w-12' />
					<div>
						<p className='m-0 text-xl font-semibold text-gray-100 '>
							Bitcoin <br /> <span className='text-xs '>BTC</span>
						</p>
					</div>
				</div>
				<div>
					{mining?.mining_profit ? (
						<p>{Number(mining?.mining_profit).toFixed(8)}$</p>
					) : (
						<p>0.00$</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default MiningStatus;
