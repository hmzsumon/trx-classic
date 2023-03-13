import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from './Login';
import SignUp from './SignUp';
import Layout from '../../../layouts/Layout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function SignIn() {
	const navigate = useNavigate();
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (isAuthenticated) {
			if (user?.role === 'admin') {
				navigate('/admin/dashboard');
			} else if (user?.role === 'user') {
				navigate('/dashboard');
			}
		}
	}, [isAuthenticated, navigate, user]);

	return (
		<Layout>
			<div className=' py-4 px-2'>
				<Box
					sx={{
						width: '100%',
						backgroundColor: '#424242',
						borderRadius: '5px',
					}}
				>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: 'divider',
							backgroundColor: 'transparent',
							boxShadow: 3,
							display: 'flex',
							justifyContent: 'center',
							padding: '.5rem 0',
						}}
					>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='basic tabs example'
							indicatorColor='primary'
						>
							<Tab
								label='Sign In'
								{...a11yProps(0)}
								sx={{
									color: '#fff',
									textAlign: 'center',
								}}
							/>
							<Tab label='Sign Up' {...a11yProps(1)} sx={{ color: '#fff' }} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<Login />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<SignUp />
					</TabPanel>
				</Box>
			</div>
		</Layout>
	);
}
