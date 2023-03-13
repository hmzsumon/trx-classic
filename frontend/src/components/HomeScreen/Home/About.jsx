import React from 'react';
import Layout from '../../../layouts/Layout';

const About = () => {
	return (
		<Layout>
			<div className='pt-[62px] h-screen '>
				<div className='px-6 md:px-40'>
					<h1 className='text-[#FF7E00] text-3xl font-semibold'>About Us:</h1>
					<p className='p-10 mt-10 text-lg font-semibold leading-9 text-gray-100 border'>
						Payunx Coin (PXC) Is An Open Source Wallet To Wallet Digital
						Currency, Favored By Blockchain Worldwide.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default About;
