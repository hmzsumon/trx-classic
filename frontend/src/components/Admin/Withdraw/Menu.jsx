import React from 'react';
import { BsFillGiftFill } from 'react-icons/bs';
import { GiTrophyCup } from 'react-icons/gi';
import { HiTicket } from 'react-icons/hi';

import { Link } from 'react-router-dom';

const Menu = ({ withdraw }) => {
	const menuItems = [
		{
			id: 1,
			name: 'All Withdraw',
			icon: <BsFillGiftFill />,
			link: '/admin/withdraws',
			value: withdraw?.totalWithdraw,
		},
		{
			id: 3,
			name: 'Pending',
			icon: <HiTicket />,
			link: '/admin/withdraws',
			value: withdraw?.pending_withdraw_count,
		},
		{
			id: 2,
			name: 'Canceled',
			icon: <GiTrophyCup />,
			link: '/admin/winners',
			value: withdraw?.total_c_w_amount,
		},
	];
	return (
		<div className='rounded-md bg-slate-800 '>
			<div className='grid grid-cols-3 gap-6 p-2 '>
				{menuItems.map((item) => (
					<Link to={item.link} key={item.id}>
						<li className='flex flex-col items-center py-4 space-y-2 text-gray-100 rounded-md cursor-pointer hover:bg-slate-700'>
							<span className={`text-xl ${item.id === 3 && 'text-red-500'}`}>
								{item.value ? item.value : 0}
							</span>
							<span
								className={`text-sm italic ${item.id === 3 && 'text-red-500'}`}
							>
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
