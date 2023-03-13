import React from 'react';
import TradingData from './TradingData';
import BuyUsdt from './BuyUsdt';
import SellUsdt from './SellUsdt';
import { CgArrowsExchange } from 'react-icons/cg';

const BuySell = ({ currentPrice }) => {
	const [btn, setBtn] = React.useState('buy');
	return (
		<div className='grid grid-cols-5 gap-2 '>
			<div className='col-span-3 space-y-2'>
				<div className='flex items-center gap-2'>
					<span>
						<CgArrowsExchange className='text-3xl text-gray-400' />
					</span>{' '}
					<p className='text-sm italic font-semibold '>
						TRXC/USDT <span className='ml-2 text-green-500'>+99%</span>
					</p>
				</div>
				<div className='grid grid-cols-2 bg-slate-700'>
					<button
						className={`px-6 py-2 text-sm font-semibold text-white  ${
							btn === 'buy' ? 'bg-green-400' : 'bg-slate-700'
						}`}
						onClick={() => setBtn('buy')}
					>
						Buy
					</button>
					<button
						className={`px-6 py-2 text-sm font-semibold text-white  ${
							btn === 'sell' ? 'bg-orange-400' : 'bg-slate-700'
						}`}
						onClick={() => setBtn('sell')}
					>
						Sell
					</button>
				</div>
				<div>
					{btn === 'buy' && <BuyUsdt currentPrice={currentPrice?.price} />}
					{btn === 'sell' && <SellUsdt currentPrice={currentPrice?.price} />}
				</div>
			</div>
			<div className='col-span-2'>
				<TradingData />
			</div>
		</div>
	);
};

export default BuySell;
