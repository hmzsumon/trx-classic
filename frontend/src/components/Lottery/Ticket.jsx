import React from 'react';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import img1 from '../../assets/lottery/person-2.png';
import win from '../../assets/lottery/big-win-small.png';
import { useBuyTicketMutation } from '../../features/lottery/lotteryApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Ticket = ({ ticket, handleBuy, userBalance, luckyBoxes }) => {
	const navigate = useNavigate();
	const [buyTicket, { isLoading, isError, isSuccess, error }] =
		useBuyTicketMutation();
	const { nextDrawTime, _id, ticketNumber, price, firstPrize } = ticket;

	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}
		if (isSuccess) {
			toast.success('Ticket bought successfully');
			navigate('/my-lotteries');
		}
	}, [isError, error, isSuccess, navigate]);

	return (
		<div className='col-span-12 md:col-span-4 sm:col-span-6 ticket'>
			<div
				className={`w-full relative h-[150px] border-[#33b5f7] border-b-2 shadow-lg rounded-sm bg-transparent`}
			>
				<div className='grid grid-cols-12 px-2 py-4'>
					<div className='absolute win '>
						<div className='flex flex-col mx-auto space-y-3'>
							<img src={win} alt='w-20' className='mx-auto w-14' />
							<small className='text-gray-700'>Next draw: {nextDrawTime}</small>
						</div>
					</div>
					<div className='flex flex-col justify-between col-span-8 px-2 space-y-4'>
						<small className='font-semibold text-gray-700'>
							No:{ticketNumber}
						</small>
						<img src='../images/up-icon.png' alt='' className='w-12 ' />
						<small className='font-semibold text-gray-700'>
							Price: ${price}
						</small>
					</div>
					<div className='flex flex-col items-center justify-center col-span-4'>
						<img src={img1} alt='' className='w-16 ' />
						<h2 className='text-xl font-semibold text-orange-300'>
							${firstPrize}
						</h2>
					</div>
				</div>
				<div className='flex items-center justify-center'>
					{/* Loader */}
					{isLoading ? (
						<div className='py-1 px-6 -bottom-4 mx-auto disabled:cursor-not-allowed absolute  text-white rounded-full bg-[#33b5f7] text-center '>
							<BeatLoader size={12} color='#fff' />
						</div>
					) : (
						<button
							className={`py-1 px-6 -bottom-4 mx-auto disabled:cursor-not-allowed absolute  text-white rounded-full text-center  bg-[#33b5f7]`}
							onClick={() => buyTicket(_id)}
							disabled={isLoading}
						>
							Buy Now
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default React.memo(Ticket);
