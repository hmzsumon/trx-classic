import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonLoader from '../../global/ButtonLoader';
import { PropagateLoader } from 'react-spinners';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import {
	useBuyShareMutation,
	useGetShareDetailsQuery,
} from '../../features/share/shareApi';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const WalletCard10 = () => {
	const { user } = useSelector((state) => state.auth);
	const { data, isLoading } = useGetShareDetailsQuery();
	const [buyShare, { isError, isLoading: buyLoading, isSuccess, error }] =
		useBuyShareMutation();
	const { shareDetails } = data || {};
	const { total_shares, total_amount } = shareDetails || {};

	const [share, setShare] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleBuyShare = () => {
		if (share <= 0) {
			toast.error('Please enter a valid quantity');
			return;
		}
		buyShare({ qty: share });
	};

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('Share bought successfully');
			setShare(0);
			setOpen(false);
		}
	}, [isError, isSuccess, error]);

	return (
		<div className='p-4 space-y-4 bg-teal-600 rounded-md'>
			<div className='text-center '>
				<span className='text-xs font-bold  text-slate-800'>
					TRX Classic Share
					<span className=''> Price = 150$</span>
				</span>
				{isLoading ? (
					<PropagateLoader color='#fff' />
				) : (
					<div className=''>
						<h1 className='text-xl italic font-bold text-gray-100 '>
							TRXCS{' '}
							{shareDetails
								? Number(total_shares).toFixed(0)
								: Number(0).toFixed(0)}{' '}
							={' '}
							{shareDetails
								? Number(total_amount).toFixed(2)
								: Number(0).toFixed(2)}
							$
						</h1>
					</div>
				)}

				<div className=''>
					<h1 className='text-xl italic font-bold text-gray-100 '>
						Profit : 0.00$
					</h1>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-4 text-[0.6rem] md:text-sm'>
				<button
					className='px-3 py-2 italic font-bold text-center bg-yellow-500 rounded-sm text-slate-800 hover:bg-yellow-600 disabled:cursor-not-allowed'
					onClick={handleClickOpen}
				>
					Buy
				</button>
				<button
					className='px-3 py-2 italic font-bold text-center text-gray-800 bg-yellow-500 rounded-sm disabled:cursor-not-allowed'
					disabled
				>
					Sell
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
					<DialogTitle>{'How Many Share You Buy?'}</DialogTitle>
					<DialogContent>
						{/* <DialogContentText id='alert-dialog-slide-description'>
							Let Google help apps determine location. This means sending
							anonymous location data to Google, even when no apps are running.
						</DialogContentText> */}
						<div className='mt-2'>
							<TextField
								id='outlined-basic'
								label='Quantity'
								variant='outlined'
								fullWidth
								size='small'
								type='number'
								value={share}
								onChange={(e) => setShare(e.target.value)}
							/>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleBuyShare}>
							{buyLoading ? <ButtonLoader /> : 'Buy Share'}
						</Button>
						<Button onClick={handleClose} sx={{ color: 'red' }}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			{/* Dialog End */}
		</div>
	);
};

export default WalletCard10;
