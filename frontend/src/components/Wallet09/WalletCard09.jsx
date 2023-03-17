import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import ButtonLoader from '../../global/ButtonLoader';
import { PropagateLoader } from 'react-spinners';

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

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const WalletCard09 = () => {
	const [startTrxcMining, { isError, isLoading, isSuccess, error }] =
		useStartTrxcMiningMutation();

	const { data, isLoading: miningLoading } = useGetUserTrxcMiningQuery();
	const { trxcMining } = data || {};

	const [open, setOpen] = React.useState(false);
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

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('Mining started successfully');
		}
	}, [isError, isSuccess, error]);

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
						disabled={isLoading}
					>
						{isLoading ? (
							<ButtonLoader bgColor='bg-yellow-500' />
						) : (
							'Start Mining'
						)}
					</button>
				)}

				<button
					className='px-3 py-2 italic font-bold text-center text-gray-800 bg-yellow-500 rounded-sm tex disabled:cursor-not-allowed'
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
					<DialogTitle>{'Transfer Minimum 100$!'}</DialogTitle>
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

export default WalletCard09;
