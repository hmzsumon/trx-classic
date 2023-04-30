import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import ButtonLoader from '../../global/ButtonLoader';
import { FadeLoader, PropagateLoader } from 'react-spinners';

import {
	useGetUserTrxcMiningQuery,
	useStartTrxcMiningMutation,
} from '../../features/trxc/trxcApi';
import Countdown from './Countdown';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useTransferTrxMiningProfitMutation } from '../../features/tnx/tnxApi';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DialogContentText } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const WalletCard09 = () => {
	const [startTrxcMining, { isError, isLoading, isSuccess, error }] =
		useStartTrxcMiningMutation();

	const { data, isLoading: miningLoading } = useGetUserTrxcMiningQuery();
	const { trxcMining } = data || {};

	const [
		transferTrxMiningProfit,
		{
			isError: transferIsError,
			isLoading: t_loading,
			isSuccess: t_isSuccess,
			error: t_error,
		},
	] = useTransferTrxMiningProfitMutation();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	// handle start trxc mining
	const handleStartTrxcMining = async () => {
		startTrxcMining();
	};

	const handleTransfer = () => {
		transferTrxMiningProfit();
		if (t_isSuccess) {
			handleClose();
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('Mining started successfully');
		}
	}, [isError, isSuccess, error]);

	useEffect(() => {
		if (transferIsError) {
			toast.error(t_error?.data?.message);
		}
		if (t_isSuccess) {
			toast.success('Transfer successfully');
			navigate('/all-history');
		}
	}, [transferIsError, t_isSuccess, t_error, navigate]);

	let dialogTitle = 'Transfer will be done minimum $10!';
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
	} else if (trxcMining?.profit < 10) {
		dialogTitle = 'You have to have minimum $10 mining profit to transfer!';
	} else if (trxcMining?.profit >= 10 && user?.is_first_deposit) {
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
					TRXC Mining (Free)
				</span>
				<div className=''>
					{miningLoading ? (
						<PropagateLoader color='#fff' />
					) : (
						<Countdown profit={trxcMining?.profit} />
					)}
				</div>
			</div>
			<div className='grid grid-cols-2 gap-4 text-[0.6rem] md:text-sm'>
				{trxcMining ? (
					<button
						className='px-3 py-2 italic font-bold text-center bg-yellow-500 rounded-sm text-slate-800 hover:bg-yellow-600 disabled:cursor-not-allowed'
						onClick={handleClickOpen}
					>
						Transfer
					</button>
				) : (
					<button
						className='px-3 py-2 italic font-bold text-center bg-yellow-500 rounded-sm text-slate-800 hover:bg-yellow-600 disabled:cursor-not-allowed'
						onClick={handleStartTrxcMining}
						disabled
					>
						{isLoading ? (
							<ButtonLoader bgColor='bg-yellow-500' />
						) : (
							'Start Mining'
						)}
					</button>
				)}

				<button
					className='px-3 py-2 italic font-bold text-center text-red-500 bg-yellow-500 rounded-sm tex disabled:cursor-not-allowed'
					disabled
				>
					All Ready Expire
				</button>
			</div>
			{/* Dialog Start */}
			{t_loading ? (
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

export default WalletCard09;
