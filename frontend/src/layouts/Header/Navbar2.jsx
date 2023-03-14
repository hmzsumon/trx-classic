import React from 'react';

import { NavLink } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

const Navbar2 = () => {
	return (
		<>
			<nav className='fixed inset-x-0 top-0 z-30 flex flex-wrap items-center justify-between px-4 py-4 shadow-lg bg-slate-900 md:px-6 '>
				<div className='flex items-center justify-start space-x-2 md:space-x-6 '>
					<NavLink
						to='/'
						onClick={() => scroll.scrollToTop()}
						className='flex items-center'
					>
						<img src='/images/trx1.png' alt='logo' className='w-14' />
						<h1 className='hidden italic font-bold text-orange-500 lowercase md:block md:text-3xl'>
							TRX Classic
						</h1>
						<h1 className='text-2xl italic font-bold text-orange-500 lowercase md:hidden'>
							TRX Classic
						</h1>
					</NavLink>
				</div>
			</nav>
		</>
	);
};

export default Navbar2;
