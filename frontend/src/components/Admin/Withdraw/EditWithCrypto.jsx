import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import {
	useApproveWithdrawMutation,
	useCancelWithdrawMutation,
} from '../../../features/withdraw/withdrawApi';
import { BeatLoader } from 'react-spinners';

const EditWithCrypto = ({ id }) => {
	const [
		approveWithdraw,
		{ isLoading, isSuccess: a_success, isError: a_isError, error: a_error },
	] = useApproveWithdrawMutation();

	const [cancelWithdraw, { isLoading: c_loading }] =
		useCancelWithdrawMutation();

	const btnRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [action, setAction] = useState('');

	const [cryptoName, setCryptoName] = useState('');
	const [cryptoAddress, setCryptoAddress] = useState('');
	const [cryptoTnxId, setCryptoTnxId] = useState('');
	const [reason, setReason] = useState('');

	// handle change action
	const handleChangeAction = (action) => {
		if (action === 'approve') {
			setAction('approve');
		} else if (action === 'cancel') {
			setAction('cancel');
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// delete handler
	const approveHandler = () => {
		console.log('id =', id, cryptoName, cryptoAddress, cryptoTnxId);
		approveWithdraw({ id, cryptoName, cryptoAddress, cryptoTnxId });
		setCryptoName('');
		setCryptoAddress('');
		setCryptoTnxId('');
	};

	// cancel withdraw
	const handleCancelWithdraw = () => {
		cancelWithdraw({ id, reason });
		setReason('');
	};

	// handle action
	const handleAction = () => {
		if (action === 'approve') {
			approveHandler();
		} else if (action === 'cancel') {
			handleCancelWithdraw();
		}
		setOpen(false);
	};

	// useEffect
	React.useEffect(() => {
		if (a_success) {
			toast.success('Withdraw Approved');
		}
		if (a_isError) {
			toast.error(a_error.data.message);
		}
	}, [a_success, a_isError, a_error]);
	return (
		<div className='grid grid-cols-2'>
			<button
				type='button'
				ref={btnRef}
				name='delete'
				onClick={() => handleChangeAction('approve')}
				className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
			>
				Approve
			</button>
			<button
				type='button'
				ref={btnRef}
				name='cancel'
				onClick={() => handleChangeAction('cancel')}
				className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
			>
				Canceled
			</button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
			>
				<DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>

				<DialogContent>
					<p className='text-gray-500'>
						Do you really want to{' '}
						<span
							className={`${
								action === 'delete' ? 'text-red-500' : 'text-orange-500'
							}`}
						>
							{action === 'approve' ? 'Approve' : 'Cancel'}
						</span>{' '}
						This process cannot be undone.
					</p>
					{action === 'approve' && (
						<Box className='my-2 space-y-2'>
							<TextField
								id='outlined-basic'
								label='Crypto Name'
								variant='outlined'
								type='text'
								fullWidth
								size='small'
								value={cryptoName}
								onChange={(e) => setCryptoName(e.target.value)}
							/>

							<TextField
								id='outlined-basic'
								label='Crypto Address'
								variant='outlined'
								type='text'
								fullWidth
								size='small'
								value={cryptoAddress}
								onChange={(e) => setCryptoAddress(e.target.value)}
							/>

							<TextField
								id='outlined-basic'
								label='Crypto Tnx Id'
								variant='outlined'
								type='text'
								fullWidth
								size='small'
								value={cryptoTnxId}
								onChange={(e) => setCryptoTnxId(e.target.value)}
							/>
						</Box>
					)}

					{action === 'cancel' && (
						<Box className='my-2 space-y-2'>
							<TextField
								id='outlined-basic'
								label='Please Enter Reason'
								variant='outlined'
								type='text'
								fullWidth
								size='small'
								value={reason}
								onChange={(e) => setReason(e.target.value)}
							/>
						</Box>
					)}
				</DialogContent>

				<DialogActions>
					<button
						onClick={handleClose}
						className='px-6 py-2 text-white bg-gray-400 rounded shadow hover:bg-gray-500'
					>
						No
					</button>
					<button
						onClick={handleAction}
						className='px-6 py-2 ml-4 text-white bg-red-600 rounded shadow hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50'
						disabled={
							action === 'approve' &&
							(cryptoName === '' || cryptoAddress === '' || cryptoTnxId === '')
								? true
								: action === 'cancel' && reason === ''
								? true
								: false
						}
					>
						{isLoading ? <BeatLoader color='#000' size={10} /> : 'Yes'}
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default EditWithCrypto;
