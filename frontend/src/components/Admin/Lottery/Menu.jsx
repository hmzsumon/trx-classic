import React from 'react';
import { BsFillGiftFill } from 'react-icons/bs';
import { GiTrophyCup } from 'react-icons/gi';
import { HiTicket } from 'react-icons/hi';

import { Link } from 'react-router-dom';

const menuItems = [
	{ id: 1, name: 'Raffle Draw', icon: <BsFillGiftFill />, link: '/admin/draw' },
	{
		id: 3,
		name: 'Sold Tickets',
		icon: <HiTicket />,
		link: '/admin/sold-tickets',
	},
	{ id: 2, name: 'Winners', icon: <GiTrophyCup />, link: '/admin/winners' },
	{
		id: 4,
		name: 'Create Tickets',
		icon: <HiTicket />,
		link: '/admin/create-tickets',
	},
];

const Menu = () => {
	return (
		<div className='rounded-md bg-slate-800 '>
			<div className='grid grid-cols-4 gap-6 p-2 '>
				{menuItems.map((item) => (
					<Link to={item.link} key={item.id}>
						<li className='flex flex-col items-center py-4 space-y-2 text-gray-100 rounded-md cursor-pointer hover:bg-slate-700'>
							<span className='text-xl'>{item.icon}</span>
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
