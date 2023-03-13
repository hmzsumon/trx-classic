import React from 'react';
import PrizeList from './PrizeList';
import { NavLink } from 'react-router-dom';

const LotteryBanner = () => {
	return (
		<div className='py-6'>
			<div className='grid grid-cols-2 gap-2 '>
				<div>
					<PrizeList />
				</div>
				<div>
					<div className='grid items-center gap-2'>
						<NavLink to='/my-lotteries'>
							<button className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
								My Lotteries
							</button>
						</NavLink>

						<NavLink to='/user/winners'>
							<button className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
								Show Result
							</button>
						</NavLink>

						<button className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
							Sold Tickets: 300
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LotteryBanner;
