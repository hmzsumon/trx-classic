import React from 'react';
import Layout from '../../../layouts/Layout';

const exchanges = [
	{
		id: 1,
		name: 'Binance',
		url: 'https://www.binance.com/en',
		img: 'binance',
	},
	{
		id: 2,
		name: 'Bitfinex',
		url: 'https://www.bitfinex.com/',
		img: 'bitfinex',
	},
	{
		id: 3,
		name: 'Coinsbit',
		url: 'https://coinsbit.io/',
		img: 'coinsbit',
	},
	{
		id: 4,
		name: 'Bitkub',
		url: 'https://www.bitkub.com/',
		img: 'bitkub',
	},
	{
		id: 5,
		name: 'Coinw',
		url: 'https://coinw.com/',
		img: 'coinw',
	},
	{
		id: 6,
		name: 'Btc-exchange',
		url: 'https://www.btc-exchange.com/',
		img: 'btc-exchange',
	},
];

const Exchange2 = () => {
	return (
		<Layout>
			<div className='h-full py-20 '>
				<div className='px-6 md:px-40'>
					<h1 className='text-[#FF7E00] text-3xl font-semibold'>
						All Exchange:
					</h1>
					<div className='grid p-10 mt-10 space-y-6 text-lg font-semibold leading-9 text-gray-100 border md:grid-cols-3'>
						{exchanges.map((item) => (
							<a
								href={item.url}
								key={item.id}
								className='flex items-center justify-center w-full space-x-4 list-none'
							>
								<img src={`/images/${item.img}.png`} alt='' className='w-28' />
								<p>{item.name}</p>
							</a>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Exchange2;
