import React from 'react';
import Layout from '../Dashboard/Layout/Layout';
import { NavLink } from 'react-router-dom';
import { useCreateWithdrawDetailsQuery } from '../../features/withdraw/withdrawApi';

import { FadeLoader } from 'react-spinners';

const WithdrawUsdx = () => {
	const { isLoading } = useCreateWithdrawDetailsQuery();
	return (
		<Layout>
			{isLoading ? (
				<div className='flex items-center justify-center h-80'>
					<FadeLoader color='#36d7b7' size={150} />
				</div>
			) : (
				<div className='h-screen mt-24'>
					<div className='  w-11/12 px-2 py-4 mx-auto space-y-4 rounded-md bg-slate-800 md:w-9/12'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-2 items-center  justify-center'>
							<NavLink
								to='/withdraw/crypto'
								className=' bg-transparent border border-blue-600 text-center py-6 rounded-md'
							>
								<span> Crypto </span>
							</NavLink>

							<NavLink
								to='/user/withdraws'
								className=' bg-transparent border border-blue-600 text-center py-6 rounded-md'
							>
								<span> My Withdraws </span>
							</NavLink>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default WithdrawUsdx;
