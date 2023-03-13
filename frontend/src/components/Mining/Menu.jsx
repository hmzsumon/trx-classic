import React from 'react';

import { SiConvertio } from 'react-icons/si';

import { FaHome } from 'react-icons/fa';

import { NavLink } from 'react-router-dom';
import { GiPayMoney } from 'react-icons/gi';
import { MdArrowBack } from 'react-icons/md';

const miningsMenuItems = [
	{
		id: 1,
		name: 'Mining',
		icon: <FaHome />,
		path: '/mining',
		disabled: false,
	},
	{
		id: 2,
		name: 'Investment',
		icon: <GiPayMoney />,
		path: '/mining/investment',
	},

	{
		id: 5,
		name: 'Convert',
		icon: <SiConvertio />,
		path: '/convert',
	},
	{
		id: 6,
		name: 'Go Back',
		icon: <MdArrowBack />,
		path: '/dashboard',
	},
];

const Menu = () => {
	return (
		<div className='rounded-md bg-slate-800 '>
			<div className='grid grid-cols-4 gap-6 p-2 '>
				{miningsMenuItems.map((item) => (
					<NavLink
						to={item.path}
						key={item.id}
						className={(nav) => nav.isActive && 'text-yellow-400'}
					>
						<li className='flex flex-col items-center py-4 space-y-2 text-gray-100 rounded-md cursor-pointer hover:bg-slate-700'>
							<span className='text-xl'>{item.icon}</span>
							<span c className='text-sm italic'>
								{item.name}
							</span>
						</li>
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default Menu;
