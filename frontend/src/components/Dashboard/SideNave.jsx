import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MdOutlineDomainVerification from '@mui/icons-material/DomainVerification';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../features/auth/authApi';

import {
	FaShareAlt,
	FaAppStoreIos,
	FaBorderAll,
	FaCoins,
} from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { FcSettings } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { SiMagento } from 'react-icons/si';

export default function SideNave() {
	const navigate = useNavigate();

	const items = [
		{
			id: 1,
			name: 'History',
			icon: <FaBorderAll />,
			link: () => navigate('/history'),
		},
		{
			id: 2,
			name: 'Referral',
			icon: <FaShareAlt />,
			link: () => navigate('/referral'),
		},
		{
			id: 3,
			name: 'Merchant',
			icon: <SiMagento />,
			link: () => navigate('/merchant'),
		},
		{
			id: 14,
			name: 'Loan',
			icon: <FaCoins />,
			link: () => navigate('/loan'),
		},
		{
			id: 4,
			name: 'Security',
			icon: <MdSecurity />,
			link: () => navigate('/security'),
		},
		{
			id: 5,
			name: 'Settings',
			icon: <FcSettings />,
			link: () => navigate('/settings'),
		},
		{
			id: 6,
			name: 'App Link',
			icon: <FaAppStoreIos />,
			link: () => navigate('/app-link'),
		},
		{
			id: 7,
			name: 'Verification',
			icon: <MdOutlineDomainVerification />,
			link: () => navigate('/verification'),
		},
		{
			id: 8,
			name: 'Payment Proof',
			icon: <MdOutlineDomainVerification />,
			link: () => navigate('/withdraw/proof'),
		},
	];

	const [logout, { isSuccess }] = useLogoutMutation();
	const { user } = useSelector((state) => state.auth);
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<Box
			sx={{
				width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 180,
				backgroundColor: 'black',
			}}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<div className='px-6 py-5'>
				<h1 className='text-sm font-semibold text-gray-100'>{user?.name}</h1>
				<h1 className='text-xs font-semibold text-gray-100 '>{user?.email}</h1>
				{user?.is_identity_verified ? (
					<h1 className='flex items-center space-x-1 text-xs font-semibold text-green-500'>
						<span>Verified</span>
						<span className=' capitalize text-[0.5rem]'>
							{' '}
							({user.is_merchant ? 'Merchant' : user?.role})
						</span>
					</h1>
				) : (
					<h1 className='flex items-center mt-2 space-x-1 text-xs font-semibold text-yellow-500'>
						<span>Not Verified </span>
						<span className=' capitalize text-[0.5rem]'>
							{' '}
							({user.is_merchant ? 'Merchant' : user?.role})
						</span>
					</h1>
				)}
			</div>
			<Divider />
			<List>
				{items.map((item, index) => (
					<ListItem key={item} disablePadding onClick={item.link}>
						<ListItemButton>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />

			<div className='px-6 py-5'>
				<Button variant='contained' color='secondary' onClick={() => logout()}>
					Logout
				</Button>
			</div>
		</Box>
	);

	React.useEffect(() => {
		if (isSuccess) {
			window.location.href = '/';
		}
	}, [isSuccess]);

	return (
		<div>
			{['left'].map((anchor) => (
				<React.Fragment key={anchor}>
					<Button onClick={toggleDrawer(anchor, true)}>
						<MenuIcon fontSize='medium' sx={{ color: 'white' }} />
					</Button>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
