import React from 'react';

const sellData = [
	{ id: 1, PXC: 0.00943219, usdt: 730.42 },
	{ id: 2, PXC: 0.01743211, usdt: 181.79 },
	{ id: 3, PXC: 0.01847851, usdt: 63.0 },
	{ id: 4, PXC: 0.00875874, usdt: 22.45 },
	{ id: 5, PXC: 0.01874402, usdt: 13.22 },
];

const buyData = [
	{ id: 1, PXC: 0.09785414, usdt: 44.23 },
	{ id: 2, PXC: 0.01737841, usdt: 62.14 },
	{ id: 3, PXC: 0.01874784, usdt: 16.28 },
	{ id: 4, PXC: 0.01847571, usdt: 1160.45 },
	{ id: 5, PXC: 0.01945127, usdt: 987.55 },
];

const TradingData = () => {
	return (
		<div className='space-y-2 '>
			<div className='grid grid-cols-2 '>
				<li className='text-xs list-none '>
					<p>Last Order</p>
					<p className=' text-[.6rem]'>(TRXC/USDT)</p>
				</li>
				<li className='text-xs text-right list-none'>
					<p>Amount</p>
					<p className='text-[.6rem]'>(USDT/USDT)</p>
				</li>
			</div>
			<div>
				{sellData.map((data) => (
					<li key={data.id} className='grid grid-cols-2 text-xs list-none '>
						<p className='text-orange-500 '>{data.PXC}</p>
						<p className='text-right text-gray-400 '>
							{Number(data.usdt).toFixed(2)}$
						</p>
					</li>
				))}
			</div>

			<div>
				{buyData.map((data) => (
					<li key={data.id} className='grid grid-cols-2 text-xs list-none '>
						<p className='text-green-500 '>{data.PXC}</p>
						<p className='text-right text-gray-400 '>
							{Number(data.usdt).toFixed(2)}$
						</p>
					</li>
				))}
			</div>
		</div>
	);
};

export default TradingData;
