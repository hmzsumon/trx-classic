import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import UserAvatar from '../../../assets/admin/user-avatar-32.png';

import Transition from '../../../utils/Transition';
import { useLogoutMutation } from '../../../features/auth/authApi';

function UserMenu() {
	const [logout] = useLogoutMutation();
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const navigate = useNavigate();

	const onLogout = () => {
		logout();
		navigate('/');
	};

	const { user } = useSelector((state) => state.auth);

	const trigger = useRef(null);
	const dropdown = useRef(null);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (
				!dropdownOpen ||
				dropdown.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setDropdownOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!dropdownOpen || keyCode !== 27) return;
			setDropdownOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	return (
		<div className='relative inline-flex'>
			<button
				ref={trigger}
				className='inline-flex items-center justify-center group'
				aria-haspopup='true'
				onClick={() => setDropdownOpen(!dropdownOpen)}
				aria-expanded={dropdownOpen}
			>
				<img
					className='w-8 h-8 rounded-full'
					src={UserAvatar}
					width='32'
					height='32'
					alt='User'
				/>
				<div className='flex items-center truncate'>
					<span className='ml-2 text-sm font-medium truncate group-hover:text-green-500'>
						{user && user?.name}
					</span>
					<svg
						className='w-3 h-3 ml-1 fill-current shrink-0 text-slate-400'
						viewBox='0 0 12 12'
					>
						<path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
					</svg>
				</div>
			</button>

			<Transition
				className='origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1'
				show={dropdownOpen}
				enter='transition ease-out duration-200 transform'
				enterStart='opacity-0 -translate-y-2'
				enterEnd='opacity-100 translate-y-0'
				leave='transition ease-out duration-200'
				leaveStart='opacity-100'
				leaveEnd='opacity-0'
			>
				<div
					ref={dropdown}
					onFocus={() => setDropdownOpen(true)}
					onBlur={() => setDropdownOpen(false)}
				>
					<div className='pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200'>
						<div className='font-medium text-slate-800'>
							{user && `${user?.email} `}
						</div>
						<div className='text-xs italic capitalize text-slate-500'>
							{user && user.role}
						</div>
					</div>
					<ul>
						<li>
							<Link
								className='flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600'
								to='/user/profile'
								onClick={() => setDropdownOpen(!dropdownOpen)}
							>
								Settings
							</Link>
						</li>
						<li>
							<button
								className='flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600'
								onClick={onLogout}
							>
								Sign Out
							</button>
						</li>
					</ul>
				</div>
			</Transition>
		</div>
	);
}

export default UserMenu;
