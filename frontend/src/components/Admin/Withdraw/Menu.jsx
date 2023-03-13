import React from 'react';
import { BsFillGiftFill } from 'react-icons/bs';
import { GiTrophyCup } from 'react-icons/gi';
import { HiTicket } from 'react-icons/hi';

import { Link } from 'react-router-dom';

const menuItems = [
	{
		id: 1,
		name: 'All Withdraw',
		icon: <BsFillGiftFill />,
		link: '/admin/withdraws',
	},
	{
		id: 3,
		name: 'Pending',
		icon: <HiTicket />,
		link: '/admin/sold-tickets',
	},
	{ id: 2, name: 'Canceled', icon: <GiTrophyCup />, link: '/admin/winners' },
];

const Menu = () => {
	return (
		<div className='rounded-md bg-slate-800 '>
			<div className='grid grid-cols-3 gap-6 p-2 '>
				{menuItems.map((item) => (
					<Link to={item.link} key={item.id}>
						<li className='flex flex-col items-center py-4 space-y-2 text-gray-100 rounded-md cursor-pointer hover:bg-slate-700'>
							<span className='text-xl'>0</span>
							<span c className='text-sm italic'>
								{item.name}
							</span>
						</li>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Menu;
