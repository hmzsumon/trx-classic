import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Layout from '../../Layout';
import BannerNew from './BannerNew';
import Overview from './Overview';
import Started from './Started';

const Home = () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Layout>
			<BannerNew />
			{/* <Overview /> */}
			<Started />
			{/* <Supply /> */}
			{/* <Exchange /> */}
			{/* <Accordion /> */}
			{/* <Support /> */}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
			>
				<DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
				<DialogContent>
					<p className='text-gray-500'>
						Do you really want to delete This process cannot be undone.
					</p>
				</DialogContent>
				<DialogActions>
					<button
						onClick={handleClose}
						className='px-6 py-2 text-white bg-gray-400 rounded shadow hover:bg-gray-500'
					>
						Cancel
					</button>
					<button
						onClick={() => console.log('delete')}
						className='px-6 py-2 ml-4 text-white bg-red-600 rounded shadow hover:bg-red-700'
					>
						Delete
					</button>
				</DialogActions>
			</Dialog>
		</Layout>
	);
};

export default Home;
