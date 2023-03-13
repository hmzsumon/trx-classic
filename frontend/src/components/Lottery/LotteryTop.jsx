import React from 'react';
import LotteryImg from '../../assets/lottery/lottery.png';

const LotteryTop = () => {
	return (
		<div>
			<div className='grid grid-cols-12 items-center justify-center'>
				<div className='md:hidden flex items-center justify-center col-span-12 md:col-span-5'>
					<img src={LotteryImg} alt='' className='w-96' />
				</div>
				<div className='space-y-4  col-span-12 md:col-span-7'>
					<h1 className='text-2xl md:text-3xl  font-medium text-gray-100 text-center'>
						Take the chance to change your life
					</h1>
					<p className='text-md md:w-9/12 mx-auto text-gry-700 text-center'>
						Payunx is online lottery platform inspired by few Payunx lover's
						fantasy of the ultimate lottery platfrom.
					</p>
				</div>
				<div className=' hidden md:flex items-center justify-center col-span-12 md:col-span-5'>
					<img src={LotteryImg} alt='' className='w-96' />
				</div>
			</div>
		</div>
	);
};

export default LotteryTop;
