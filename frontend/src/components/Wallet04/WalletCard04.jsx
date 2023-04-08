import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const WalletCard04 = () => {
	const { user } = useSelector((state) => state.auth);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div className='p-4 space-y-4 bg-teal-600 rounded-md'>
			<div className='text-center '>
				<span className='text-xs font-bold text-gray-100'>
					TRXC Bonus (Free)
				</span>
				<div className=''>
					<h1 className='text-xl italic font-bold text-gray-100 '>
						{user?.bonus_balance
							? Number(user?.bonus_balance).toFixed(2)
							: Number(0).toFixed(2)}
						$
					</h1>
				</div>
			</div>

			<div className='grid grid-cols-2 gap-4 text-[0.6rem] md:text-sm'>
				<button
					className='px-3 py-2 italic font-bold text-center bg-yellow-500 rounded-sm text-slate-800 hover:bg-yellow-600 disabled:cursor-not-allowed'
					onClick={handleClickOpen}
				>
					Transfer
				</button>
				<button
					className='px-3 py-2 italic font-bold text-center text-gray-800 bg-yellow-500 rounded-sm disabled:cursor-not-allowed'
					disabled
				>
					Expire: 30 April 2023
				</button>
			</div>

			{/* Dialog Start */}
			<div>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-describedby='alert-dialog-slide-description'
				>
					<DialogTitle>{'Transfer will be done minimum $60!'}</DialogTitle>
					<DialogContent>
						{/* <DialogContentText id='alert-dialog-slide-description'>
							Let Google help apps determine location. This means sending
							anonymous location data to Google, even when no apps are running.
						</DialogContentText> */}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} sx={{ color: 'red' }}>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			{/* Dialog End */}
		</div>
	);
};

export default WalletCard04;
