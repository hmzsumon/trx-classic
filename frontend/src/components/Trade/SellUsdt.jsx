import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BeatLoader from 'react-spinners/BeatLoader';
import { useNavigate } from 'react-router-dom';
import { useLoadUserQuery } from '../../features/auth/authApi';
import FadeLoader from 'react-spinners/FadeLoader';
import { useSellPxcMutation } from '../../features/pxc.js/pxcApi';

const SellUsdt = ({ currentPrice }) => {
	const navigate = useNavigate();
	const [sellPXC, { isLoading: sellLoading, isError, isSuccess, error }] =
		useSellPxcMutation();
	const { data, isLoading } = useLoadUserQuery();
	const { user } = data || {};
	const [amount, setAmount] = useState();
	const [, setPXCAmount] = useState();

	const handleSell = async (e) => {
		e.preventDefault();
		if (amount < 10) {
			return toast.error('Minimum Sell Amount is 10$');
		}
		const myForm = new FormData();
		myForm.append('amount', amount);
		await sellPXC(myForm);
	};

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('PXC Sold Successfully');
			navigate('/all-history');
		}
	}, [isError, isSuccess, error, navigate]);
	return (
		<>
			{isLoading ? (
				<div className='flex items-center justify-center mt-44 '>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='space-y-2 '>
					<div>
						<p className='text-xs italic font-bold text-center text-orange-500'>
							Your TRXC Balance: {Number(user?.balance).toFixed(2)}${' '}
						</p>
					</div>
					<form className='space-y-2 text-xs' onSubmit={handleSell}>
						<div className='space-y-4 '>
							<li className='w-full px-2 py-1 list-none bg-transparent border rounded '>
								Current Price: {Number(currentPrice).toFixed(8)}
							</li>
							<input
								className='w-full px-2 py-1 bg-transparent border rounded '
								type='number'
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder=' Sell Amount (TRXC)'
							/>
							<input
								className='w-full px-2 py-1 bg-transparent border rounded '
								type='number'
								value={amount - amount * 0.02}
								onChange={(e) => setPXCAmount(e.target.value)}
								placeholder=' Value Amount (USDT)'
								readOnly
							/>
						</div>
						<button
							className='w-full px-2 py-2 bg-orange-500 rounded disabled:cursor-not-allowed'
							disabled={sellLoading || !amount}
						>
							{sellLoading ? (
								<BeatLoader type='ThreeDots' color='#fff' height={20} />
							) : (
								'Sell TRXC'
							)}
						</button>
					</form>
				</div>
			)}
		</>
	);
};

export default SellUsdt;
