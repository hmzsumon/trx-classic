import React from 'react';
import Layout from '../Dashboard/Layout/Layout';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { methods } from '../../utils/methods';
import { useCreateWithdrawMutation } from '../../features/withdraw/withdrawApi';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});
const Crypto = () => {
	const navigate = useNavigate();
	const [createWithdraw, { isLoading, isSuccess, isError, error }] =
		useCreateWithdrawMutation();
	const [method, setMethod] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [amount, setAmount] = React.useState(null);
	const [address, setAddress] = React.useState('');

	const handleClickOpen = (m) => {
		setOpen(true);
		setMethod(m);
	};

	const handleClose = (c) => {
		setOpen(false);
	};

	const handleWithdraw = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.append('amount', amount);
		myForm.append('wallet_address', address);
		myForm.append('method', 'crypto');
		myForm.append('crypto_name', method.title);

		createWithdraw(myForm);
		if (!isLoading) {
			setAmount(0);
			setAddress('');
			setOpen(false);
		}
	};

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Withdrawal request sent successfully');
			navigate('/user/withdraws');
		}
		if (isError) {
			toast.error(error.data.message);
			if (error.data.message === 'You have pending withdraw request') {
				navigate('/user/withdraws');
			}
		}
	}, [isSuccess, isError, error, navigate]);

	return (
		<Layout>
			<div className='h-screen'>
				<div className='px-4 py-2 mx-auto rounded md:w-7/12 bg-slate-800'>
					<h1 className='my-2 text-center'>Withdraw with Cryptocurrency</h1>
					<div className='space-y-6 '>
						{methods.map((method) => (
							<div key={method.id} className='space-y-4'>
								<img
									src={method.img}
									alt={method.title}
									className='w-20 mx-auto'
								/>
								<button
									className='w-full py-2 text-center bg-green-500 rounded'
									onClick={() => handleClickOpen(method)}
								>
									<span>{method.title}</span>
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
			{/* Dialog */}
			<div>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-describedby='alert-dialog-slide-description'
				>
					<DialogContent>
						<DialogContentText id='alert-dialog-slide-description'>
							<img
								src={method?.img}
								alt={method?.title}
								className='w-20 mx-auto'
							/>
						</DialogContentText>
						<DialogTitle>{` Withdraw By ${method?.title}`}</DialogTitle>
						<form className='flex flex-col gap-2' onSubmit={handleWithdraw}>
							<small className='text-xs text-center text-gray-400'>
								Min Withdraw: 100$ & Max Withdraw: 10,000
							</small>
							<input
								type='number'
								className='px-2 py-1 text-xs bg-transparent border border-yellow-400 rounded '
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder='Amount'
							/>

							<input
								type='text'
								className='px-2 py-1 text-xs bg-transparent border border-yellow-400 rounded '
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								placeholder='Wallet Address'
							/>

							<button
								className='py-2 bg-green-500 rounded-sm disabled:cursor-not-allowed'
								type='submit'
								disabled={
									!amount ||
									!address ||
									isLoading ||
									amount < 100 ||
									amount > 10000
								}
							>
								{isLoading ? <FadeLoader color='#fff' /> : 'Confirm'}
							</button>
						</form>
						<button
							className='w-full py-2 my-2 bg-orange-500 rounded-sm'
							onClick={handleClose}
						>
							Cancel
						</button>
						<p className='text-xs font-bold text-center text-green-400'>
							Withdraw Fee 5.00$
						</p>
					</DialogContent>
				</Dialog>
			</div>
		</Layout>
	);
};

export default Crypto;
