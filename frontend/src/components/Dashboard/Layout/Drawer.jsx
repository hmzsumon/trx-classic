import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Drawer as MuiDrawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Box,
	Typography,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InfoIcon from '@mui/icons-material/Info';

const Drawer = () => {
	const navigate = useNavigate();
	const items = [
		{
			name: 'Home',
			icon: '<AccountBalanceIcon/>',
			link: () => navigate('/'),
		},
		{ name: 'About', icon: '<InfoIcon/>', link: () => navigate('/about') },
		{
			name: 'Contact',
			icon: '<ContactPhoneIcon/>',
			link: () => navigate('/contact'),
		},
	];
	return (
		<div>
			<MuiDrawer>
				<List>
					{items.map((item, index) => (
						<ListItem key={item} disablePadding onClick={item.link}>
							<ListItemIcon>
								{index % 2 === 0 ? <AccountBalanceIcon /> : <InfoIcon />}
							</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItem>
					))}
				</List>
			</MuiDrawer>
		</div>
	);
};

export default Drawer;
