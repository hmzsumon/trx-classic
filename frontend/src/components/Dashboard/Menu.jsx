import React from 'react';
import { BsFillGiftFill } from 'react-icons/bs';
import { SiConvertio } from 'react-icons/si';
import { RiCoinsLine } from 'react-icons/ri';
import { FaQuestionCircle, FaCoins, FaHandHoldingUsd } from 'react-icons/fa';
import { FcOnlineSupport } from 'react-icons/fc';
import { HiAcademicCap } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const menuItems = [
	{ id: 1, name: 'Referral', icon: <BsFillGiftFill />, link: '/referral' },
	{ id: 3, name: 'Buy PXC', icon: <RiCoinsLine />, link: '/buy-PXC' },
	{ id: 2, name: 'Loan', icon: <FaCoins />, link: '/loan' },
	{ id: 4, name: 'FAQ', icon: <FaQuestionCircle />, link: '/faq' },
	{ id: 5, name: 'Live Chat', icon: <FcOnlineSupport />, link: '/support' },
	{ id: 6, name: 'Merchant', icon: <HiAcademicCap />, link: '/merchant' },
	{
		id: 7,
		name: 'Convert',
		icon: <SiConvertio />,
		link: '/convert',
	},
	{ id: 8, name: 'Lottery', icon: <FaHandHoldingUsd />, link: '/lottery' },
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
