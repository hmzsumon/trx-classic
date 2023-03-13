import { motion } from 'framer-motion';
import React from 'react';
import logo from '../../../assets/logo/new-pxc.png';
// import Particles from 'react-tsparticles';

const BannerNew = () => {
	return (
		<div className=' pt-[12px] bg-transparent' id='home'>
			<h1 className='mt-16 text-4xl text-center text-white md:text-5xl'>
				Get started with TRX Classic.
			</h1>
			<div className='flex flex-col items-center justify-center h-screen space-y-6'>
				<motion.div
					animate={{ pathLength: 1 }}
					transition={{ duration: 2, type: 'tween' }}
				>
					<img src='/images/trx1.png' alt='Logo' className='w-60 ' />
				</motion.div>

				<motion.h1
					initial={{ x: 300, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
					className='w-full text-2xl px-4 md:px-6 md:text-5xl font-bold leading-[3rem]  md:leading-[4rem] text-center text-white line md:w-9/12'
				>
					TRX Classic. (trxc) Is An Open Source Peer-to-Peer Digital Currency,
					Favored By Blockchain Worldwide.
				</motion.h1>
			</div>
		</div>
	);
};

export default BannerNew;
