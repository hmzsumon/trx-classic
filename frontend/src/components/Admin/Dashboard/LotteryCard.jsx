import React from 'react';

const LotteryCard = ({ title = 'Admin Info', lottery }) => {
	return (
		<div className='p-2 border border-blue-700 rounded-md bg-slate-700'>
			<h3 className='text-xs italic font-semibold text-center'>{title}</h3>
			<div className='my-2 space-y-2 '>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Today Sell: {lottery?.toDaySellAmount}$
					</p>
					<p className='text-xs italic font-semibold'>
						Total Sell: {lottery?.totalSellAmount}$
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Today Count: {lottery?.toDaySellCount}
					</p>
					<p className='text-xs italic font-semibold'>
						Total Count: {lottery?.totalSellCount}
					</p>
				</div>
			</div>
		</div>
	);
};

export default LotteryCard;
