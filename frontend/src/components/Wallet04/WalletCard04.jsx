import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import FadeLoader from 'react-spinners/FadeLoader';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTransferBonusMutation } from '../../features/tnx/tnxApi';
import { useEffect } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const WalletCard04 = () => {
	const [transferBonus, { isError, isLoading, isSuccess, error }] =
		useTransferBonusMutation();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleTransfer = () => {
		transferBonus();
		if (isSuccess) {
			handleClose();
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}

		if (isSuccess) {
			toast.success('Bonus transfer successfully!');
			navigate('/all-history');
		}
	}, [isError, error, isSuccess, navigate]);

	let dialogTitle = 'Transfer will be done minimum $60!';
	let content = '';
	if (!user?.is_first_deposit) {
		dialogTitle = 'You have to make you have minimum buy 15$!';
		content = (
			<div className='flex items-center justify-center space-x-2'>
				<NavLink
					to='/buy-trxc'
					className='px-3 py-2 italic font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Buy TRXC
				</NavLink>
			</div>
		);
	} else if (user?.bonus_balance < 60) {
		dialogTitle = 'You have to have minimum $60 bonus to transfer!';
	} else if (user?.bonus_balance >= 60 && user?.is_first_deposit) {
		dialogTitle = 'are you sure to transfer your bonus?';
		content = (
			<div className='flex items-center justify-center space-x-2'>
				<button
					className='px-3 py-2 italic font-bold text-center bg-yellow-500 rounded-sm text-slate-800 hover:bg-yellow-600 disabled:cursor-not-allowed'
					onClick={handleTransfer}
				>
					Confirm
				</button>
				<button
					className='px-3 py-2 italic font-bold text-center text-gray-800 bg-orange-500 rounded-sm disabled:cursor-not-allowed'
					onClick={handleClose}
				>
					Cancel
				</button>
			</div>
		);
	}

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
					className='px-3 py-2 italic font-bold text-center text-red-500 bg-yellow-500 rounded-sm disabled:cursor-not-allowed'
					disabled
				>
					All Ready Expire
				</button>
			</div>

			{/* Dialog Start */}
			{isLoading ? (
				<div className='flex items-center justify-center'>
					<FadeLoader color='#fbbf24' loading={isLoading} size={150} />
				</div>
			) : (
				<div>
					<Dialog
						open={open}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleClose}
						aria-describedby='alert-dialog-slide-description'
					>
						<DialogTitle>{dialogTitle}</DialogTitle>
						<DialogContent>
							<DialogContentText id='alert-dialog-slide-description'>
								{content}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} sx={{ color: 'red' }}>
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			)}
			{/* Dialog End */}
		</div>
	);
};

export default WalletCard04;
