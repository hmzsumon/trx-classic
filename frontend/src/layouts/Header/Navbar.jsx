import React, { useState } from 'react';
import { MdClose, MdOutlineMenuOpen } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { animateScroll as scroll, Link } from 'react-scroll';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import DropdownItem from './DropdownItem';
import SignInContainer from '../../components/HomeScreen/Home/SignInContainer';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const navbarItems = [
	{
		id: 1,
		name: 'Company',
		items: [
			{
				id: 1,
				name: 'About',
				link: '/about',
			},
			{
				id: 2,
				name: 'Support',
				link: '/support',
			},
			{
				id: 3,
				name: 'Privacy Policy',
				link: '/privacy',
			},
			{
				id: 4,
				name: 'Terms of Service',
				link: '/terms',
			},
		],
	},
	{
		id: 2,
		name: 'Participate',
		items: [
			{
				id: 1,
				name: 'Deposit',
				link: '/deposit',
			},
			{
				id: 2,
				name: 'Mining',
				link: '/mining',
			},
			{
				id: 3,
				name: 'Withdraw',
				link: '/withdraw',
			},
		],
	},
	{
		id: 3,
		name: 'Exchange',
		items: [
			{
				id: 1,
				name: 'All Exchange',
				link: '/home/exchange',
			},
		],
	},
	{
		id: 4,
		name: 'Faq',
		items: [
			{
				id: 1,
				name: 'All Faq',
				link: '/faq',
			},
		],
	},
];

const Navbar = () => {
	const { pathname } = useLocation();

	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const [isOpen, setIsOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const toggle = () => {
		setOpen(!open);
	};

	return (
		<>
			<nav className='fixed inset-x-0 top-0 z-30 flex flex-wrap items-center justify-between px-4 py-4 shadow-lg bg-slate-900 md:px-6 '>
				<div className='flex items-center justify-start space-x-2 md:space-x-6 '>
					<MdOutlineMenuOpen
						className='text-3xl text-white cursor-pointer md:hidden'
						onClick={() => setIsOpen(!isOpen)}
					/>
					<NavLink
						to='/'
						onClick={() => scroll.scrollToTop()}
						className='flex items-center'
					>
						<img src='/images/trx1.png' alt='logo' className='w-14' />
						<h1 className='hidden italic font-bold text-orange-500 md:block md:text-3xl'>
							TRX Classic
						</h1>
						<h1 className='text-2xl italic font-bold text-orange-500 lowercase md:hidden'>
							TRX Classic
						</h1>
					</NavLink>
				</div>

				<div className='items-center hidden space-x-6 md:flex'>
					<div className='flex items-center gap-2'>
						{isAuthenticated ? (
							<NavLink
								to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
								className='inline-flex items-center px-4 py-2 text-lg font-semibold bg-orange-500 rounded-md text-slate-700 disabled:cursor-not-allowed'
							>
								Dashboard
							</NavLink>
						) : (
							<button
								onClick={toggle}
								className='inline-flex items-center px-4 py-2 text-lg font-semibold bg-orange-500 rounded-md text-slate-700 disabled:cursor-not-allowed'
								disabled={pathname === '/register' || pathname === '/login'}
							>
								<span>Login</span>
							</button>
						)}
					</div>

					{/* <AiOutlineMenu className='text-3xl' /> */}
				</div>
				{/* <AiOutlineMenu className='text-3xl cursor-pointer md:hidden' /> */}
				<div className='flex items-center md:hidden'>
					<div className='flex items-center gap-2'>
						{isAuthenticated ? (
							<NavLink
								to='/dashboard'
								className='inline-flex items-center px-4 py-2 text-lg font-semibold bg-orange-500 rounded-md text-slate-700 disabled:cursor-not-allowed'
							>
								Dashboard
							</NavLink>
						) : (
							<button
								onClick={toggle}
								className='inline-flex items-center px-4 py-2 text-lg font-semibold bg-orange-500 rounded-md text-slate-700 disabled:cursor-not-allowed'
								disabled={pathname === '/register' || pathname === '/login'}
							>
								<span>Login</span>
							</button>
						)}
					</div>
				</div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					sx={{
						'& .MuiDialog-paper': {
							backgroundColor: 'transparent',
							borderRadius: '.5rem',
							top: '2.5rem',
							maxWidth: '100%',
							minWidth: '85%',
						},
					}}
				>
					<DialogContent
						sx={{
							backgroundColor: '#424242',
							padding: '0px',
							borderRadius: '.5rem',
						}}
					>
						<SignInContainer />
					</DialogContent>
				</Dialog>
			</nav>

			{/* Mobile Menu */}
			<div
				className={`z-50 h-full fixed mobile_menu md:hidden transition duration-300 ease-in-out  top-0 w-9/12 ${
					isOpen ? 'active-mobile-menu' : 'mobile-menu'
				} `}
			>
				<div className='flex items-center justify-between px-4 pt-4 '>
					<Link to='/'>
						<p className='inline-flex items-center p-2 mr-4 '>
							<img src='/images/trx1.png' alt='logo' className='w-12 ' />
						</p>
					</Link>

					<MdClose
						className='text-3xl font-bold text-red-500 transition duration-300 ease-in-out cursor-pointer hover:scale-125'
						onClick={() => setIsOpen(false)}
					/>
				</div>

				<ul className='mt-2 text-white '>
					{navbarItems.map((item) => (
						<li key={item.id}>
							<DropdownItem {...item} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Navbar;
