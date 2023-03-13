import React, { useState, useEffect } from 'react';
import { useGetUsdxDetailsQuery } from '../../features/usdx/usdxApi';
import FadeLoader from 'react-spinners/FadeLoader';
import { useBuyPxcMutation } from '../../features/pxc.js/pxcApi';
import { toast } from 'react-toastify';
import BeatLoader from 'react-spinners/BeatLoader';
import { useNavigate } from 'react-router-dom';

const BuyUsdt = ({ currentPrice }) => {
	const navigate = useNavigate();
	const [buyPxcWithUsdx, { isLoading: buyLoading, isError, isSuccess, error }] =
		useBuyPxcMutation();
	const { data, isLoading } = useGetUsdxDetailsQuery();
	const { usdx } = data || {};
	const [amount, setAmount] = useState();
	const [, setPxcAmount] = useState();

	const handleBuy = async (e) => {
		e.preventDefault();
		if (amount < 10) {
			return toast.error('Minimum Buy Amount is 10$');
		}
		const myForm = new FormData();
		myForm.append('amount', amount);
		buyPxcWithUsdx(myForm);
	};

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('PXC Bought Successfully');
			navigate('/all-history');
		}
	}, [isSuccess, isError, error, navigate]);
	return (
		<>
			{isLoading ? (
				<div className='flex items-center justify-center mt-44 '>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='space-y-2 '>
					<div>
						<p className='text-xs italic font-bold text-center text-green-500'>
							Your USDT Balance: {Number(usdx?.usdx_balance).toFixed(2)}${' '}
						</p>
					</div>
					<form className='space-y-2 text-xs ' onSubmit={handleBuy}>
						<div className='space-y-4 '>
							<li className='w-full px-2 py-1 list-none bg-transparent border rounded '>
								Current Price: {Number(currentPrice).toFixed(8)}
							</li>
							<input
								className='w-full px-2 py-1 bg-transparent border rounded '
								type='number'
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder=' Buy Amount (USDT)'
							/>
							<input
								className='w-full px-2 py-1 bg-transparent border rounded '
								type='number'
								value={Number(amount / currentPrice).toFixed(8)}
								onChange={(e) => setPxcAmount(e.target.value)}
								placeholder=' Value Amount (TRXC)'
								readOnly
							/>
						</div>
						<button
							className='w-full px-2 py-2 bg-green-500 rounded disabled:cursor-not-allowed'
							disabled={buyLoading || !amount}
						>
							{buyLoading ? (
								<BeatLoader type='ThreeDots' color='#fff' height={20} />
							) : (
								'Buy TRXC'
							)}
						</button>
					</form>
				</div>
			)}
		</>
	);
};

export default BuyUsdt;
