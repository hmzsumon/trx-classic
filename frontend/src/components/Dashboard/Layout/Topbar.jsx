import React from 'react';
import SideNave from '../SideNave';

import { BsBellFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Topbar = () => {
	return (
		<div className='flex flex-col px-4 py-4 mb-4 space-y-6 border-b border-slate-700'>
			<div className='flex items-center justify-between'>
				<SideNave />
				<NavLink to='/' className='flex items-center'>
					<img src='/images/trx1.png' alt='logo' className='w-8' />
					<h1 className='italic font-bold text-orange-500 md:block md:text-3xl'>
						TRX Classic
					</h1>
				</NavLink>
				<div>
					<BsBellFill className='text-xl text-gray-100' />
				</div>
			</div>
		</div>
	);
};

export default Topbar;
