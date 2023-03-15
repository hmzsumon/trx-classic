import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import ButtonLoader from '../../global/ButtonLoader';
import { PropagateLoader } from 'react-spinners';

import {
	useGetUserTrxcMiningQuery,
	useStartTrxcMiningMutation,
} from '../../features/trxc/trxcApi';
import Countdown from './Countdown';

const WalletCard09 = () => {
	const [startTrxcMining, { isError, isLoading, isSuccess, error }] =
		useStartTrxcMiningMutation();

	const { data, isLoading: miningLoading } = useGetUserTrxcMiningQuery();
	const { trxcMining } = data || {};

	// handle start trxc mining
	const handleStartTrxcMining = async () => {
		startTrxcMining();
	};

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('Mining started successfully');
		}
	}, [isError, isSuccess, error]);

	return (
		<div className='p-4 space-y-4 bg-teal-600 rounded-md'>
			<div className='text-center '>
				<span className='text-xs font-bold text-gray-100'>
					TRXC Mining (Free)
				</span>
				<div className=''>
					{miningLoading ? (
						<PropagateLoader color='#fff' />
					) : (
						<Countdown profit={trxcMining?.profit} />
					)}
				</div>
			</div>
			<div className='grid grid-cols-2 gap-4 text-[0.6rem] md:text-sm'>
				{trxcMining ? (
					<button
						className='px-3 py-2 italic font-bold text-center bg-yellow-500 rounded-sm text-slate-800 hover:bg-yellow-600 disabled:cursor-not-allowed'
						disabled
					>
						Transfer
					</button>
				) : (
					<button
						className='px-3 py-2 italic font-bold text-center bg-yellow-500 rounded-sm text-slate-800 hover:bg-yellow-600 disabled:cursor-not-allowed'
						onClick={handleStartTrxcMining}
						disabled={isLoading}
					>
						{isLoading ? (
							<ButtonLoader bgColor='bg-yellow-500' />
						) : (
							'Start Mining'
						)}
					</button>
				)}

				<button
					className='px-3 py-2 italic font-bold text-center text-gray-800 bg-yellow-500 rounded-sm tex disabled:cursor-not-allowed'
					disabled
				>
					Expire: 30 April 2023
				</button>
			</div>
		</div>
	);
};

export default WalletCard09;
