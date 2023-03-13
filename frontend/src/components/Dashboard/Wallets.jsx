import React from 'react';
import Layout from './Layout/Layout';
import WalletCard01 from '../Wallet01/WalletCard01';
import WalletCard02 from '../Wallet02/WalletCard02';

import { useLoadUserQuery } from '../../features/auth/authApi';
import { FadeLoader } from 'react-spinners';

import WalletCard06 from '../Wallet06/WalletCard06';
import WalletCard07 from '../Wallet07/WalletCard07';
import WalletCard08 from '../Wallet08/WalletCard08';

const Wallets = () => {
	const { data, isLoading } = useLoadUserQuery();
	const { user } = data || {};
	return (
		<Layout>
			{isLoading ? (
				<div className='flex justify-center items-center mt-24 h-[80%]'>
					<FadeLoader color='#fff' />
				</div>
			) : (
				<div className='h-full pb-20'>
					<h1 className='my-4 text-xl font-semibold text-gray-100'>Wallets</h1>
					<div className='space-y-4 '>
						<WalletCard01 user={user} />
						<WalletCard02 />
						<WalletCard06 />
						<WalletCard07 />
						<WalletCard08 />
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Wallets;
