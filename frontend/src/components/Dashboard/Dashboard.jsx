import React from 'react';

import Layout from './Layout/Layout';

import Notice from './Notice';
import WalletCard04 from '../Wallet04/WalletCard04';
import WalletCard05 from '../Wallet05/WalletCard05';
import WalletCard03 from '../Wallet03/WalletCard03';

import { useGetPricesQuery } from '../../features/prices/priceApi';
import PriceList2 from './PriceList2';
import WalletCard09 from '../Wallet09/WalletCard09';
import WalletCard10 from '../Wallet10/WalletCard10';
const Dashboard = () => {
	const { data } = useGetPricesQuery();
	const { currentPrice } = data || {};

	return (
		<Layout>
			<div className='h-full pb-20 space-y-4 '>
				<Notice />
				{/* <Menu /> */}
				{/* <Carousel /> */}
				<PriceList2
					title={'TRXC/USDT'}
					chance={'+99%'}
					bgColor='bg-green-500'
					lastPrice={currentPrice?.price}
					link='/PXC_usdx_chart'
					marketCap={'01.20M'}
					supply={'10.00B'}
				/>
				{/* <PriceList2
					title={'BDC/USDX'}
					chance={'+00%'}
					bgColor='bg-green-500'
					lastPrice={'0.00000000'}
					link='/bdc_usdx_chart'
					marketCap={'0.0M'}
					supply={'0.0B'}
				/> */}

				{/* <PriceList2
					title={'USDT/USDX'}
					chance={'+ 00%'}
					bgColor='bg-green-500'
					lastPrice={'1.00000000'}
					link='/usdt_usdx_chart'
					marketCap={'67.73B'}
					supply={'67.72B'}
				/> */}
				<WalletCard03 />
				<WalletCard05 />
				<WalletCard04 />
				<WalletCard09 />
				<WalletCard10 />
			</div>
		</Layout>
	);
};

export default Dashboard;
