import React from 'react';
import { AiTwotoneHome } from 'react-icons/ai';
import { GiWallet, GiMining } from 'react-icons/gi';
import { FcCurrencyExchange } from 'react-icons/fc';

import { NavLink } from 'react-router-dom';

const navItems = [
	{ id: 1, name: 'Earn', icon: <AiTwotoneHome />, link: '/dashboard' },
	{ id: 2, name: 'Exchange', icon: <FcCurrencyExchange />, link: '/trade' },
	{ id: 3, name: 'Invest', icon: <GiMining />, link: '/mining' },
	// {
	// 	id: 4,
	// 	name: 'History',
	// 	icon: <VscHistory />,
	// 	link: '/history',
	// },
	{ id: 6, name: 'News', icon: <GiWallet />, link: '/dashboard' },
	{ id: 5, name: 'Assets', icon: <GiWallet />, link: '/wallets' },
];

const Navbar = () => {
	return (
		<div className='fixed inset-x-0 bottom-0 border-t bg-slate-900 border-slate-600 '>
			<nav className='flex items-center justify-between h-16 px-4'>
				{navItems.map((item) => (
					<NavLink
						to={item.link}
						key={item.id}
						className={({ isActive }) =>
							isActive ? ' text-yellow-400' : 'text-gray-100'
						}
					>
						<li className='flex flex-col items-center justify-center text-sm font-semibold list-none md:text-xl'>
							<span>{item.icon}</span>
							<span>{item.name}</span>
						</li>
					</NavLink>
				))}
			</nav>
		</div>
	);
};

export default Navbar;
