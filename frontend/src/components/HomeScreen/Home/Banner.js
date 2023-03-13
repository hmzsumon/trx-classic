import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import BannerImg from '../../../images/live-banner.png';

// const myVariants = {
// 	hidden: {
// 		x: -300,
// 		opacity: 0,
// 	},
// 	visible: {
// 		x: 0,
// 		opacity: 1,
// 		transition: {
// 			duration: 0.2,
// 			type: 'spring',
// 			stiffness: 100,
// 		},
// 	},
// };

const Banner = () => {
	return (
		<div className='banner pt-[12px]' id='home'>
			<div className='mb-6'>
				<img src={BannerImg} alt='' />
			</div>

			<div className='flex flex-col items-center justify-center h-screen space-y-6'>
				<img
					src='../../../images/PXC_icon.png'
					alt=''
					className='w-60  -z-10'
				/>
				<motion.div
					initial={{ x: -300, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
					className=' border-2 px-12 rounded-md flex text-center items-center py-4 border-[#fff]'
				>
					<h1 className=' text-5xl  text-[#fff] font-bold '>About Us</h1>
				</motion.div>
				<motion.h1
					initial={{ x: 300, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
					className='w-full text-4xl px-6 md:text-5xl font-bold leading-[3rem]  md:leading-[4rem] text-center text-white line md:w-9/12'
				>
					Payunx Coin (PXC) Is An Open Source Wallet To Wallet Digital Currency,
					Favored By Blockchain Worldwide.
				</motion.h1>
			</div>
		</div>
	);
};

export default Banner;
