import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import { toast } from 'react-toastify';

import {
	useGetAllSoldTicketsQuery,
	usePublishWinnersMutation,
} from '../../../features/lottery/lotteryApi';
import { useEffect } from 'react';

const AdminDraw = ({ user }) => {
	const [
		publishWinners,
		{ isLoading: publishLoading, isError, error, isSuccess },
	] = usePublishWinnersMutation();
	const { data, isLoading } = useGetAllSoldTicketsQuery();
	const { tickets } = data || [];

	const [newTickets, setNewTickets] = React.useState([]);

	const [winners, setWinners] = React.useState([]);

	useEffect(() => {
		if (tickets) {
			const ticketsArray = Object.values(tickets);
			setNewTickets(ticketsArray);
		}
	}, [tickets]);

	// generate 10 winners with position 1st to 5th from the sold tickets
	//const winners = ticketsArray?.sort(() => 0.5 - Math.random()).slice(0, 10);

	const handleDraw = () => {
		// if (newTickets.length < 10) {
		// 	toast.error('Not enough tickets sold');
		// 	return;
		// }
		const winnersArray = [];
		const winners = newTickets.sort(() => 0.5 - Math.random()).slice(0, 10);

		for (let i = 0; i < winners.length; i++) {
			const winner = {
				id: winners[i]._id,
				ownerName: winners[i].ownerName,
				ticketNumber: winners[i].ticketNumber,
				position: i + 1,
			};

			if (i === 0) {
				winner.prize = 1700;
				winner.result = '1st';
			} else if (i === 1) {
				winner.prize = 500;
				winner.result = '2nd';
			} else if (i === 2) {
				winner.prize = 200;
				winner.result = '3rd';
			} else if (i === 3) {
				winner.prize = 100;
				winner.result = '4th';
			} else if (i === 4) {
				winner.prize = 50;
				winner.result = '5th';
			} else if (i === 5) {
				winner.prize = 50;
				winner.result = '6th';
			} else if (i === 6) {
				winner.prize = 50;
				winner.result = '7th';
			} else if (i === 7) {
				winner.prize = 50;
				winner.result = '8th';
			} else if (i === 8) {
				winner.prize = 50;
				winner.result = '9th';
			} else if (i === 9) {
				winner.prize = 50;
				winner.result = '10th';
			}
			winnersArray.push(winner);
		}
		setWinners(winnersArray);
	};

	const handlePublish = () => {
		publishWinners(winners);
	};

	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}
		if (isSuccess) {
			toast.success('Winners published successfully');
			setWinners([]);
		}
	}, [isError, isSuccess, error]);

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-2 py-4 space-y-4'>
					<h2>Draw Dashboard</h2>
					<button
						className='px-4 py-1 bg-yellow-400 rounded-sm'
						onClick={handleDraw}
					>
						Draw
					</button>
					<div className='px-10 '>
						<div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
							<table class='w-full text-sm text-left text-gray-400  '>
								<thead className='ml-4 text-xs text-gray-400 uppercase bg-gray-700'>
									<tr>
										<th className='pl-4 '>Winner Name</th>
										<th>Ticket No.</th>
										<th>Position</th>
										<th>Prize</th>
									</tr>
								</thead>
								<tbody>
									{winners.map((winner) => (
										<tr
											key={winner._id}
											className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
										>
											<td className='pl-4'>{winner.ownerName}</td>
											<td>{winner.ticketNumber}</td>
											<td>{winner.position}</td>
											<td>${winner.prize}</td>
										</tr>
									))}
								</tbody>
							</table>
							<button
								className='w-full px-4 py-1 bg-green-500 rounded-sm'
								onClick={handlePublish}
							>
								{publishLoading ? (
									<div className='flex items-center justify-center w-full h-screen'>
										<FadeLoader color={'#fbbf24'} />
									</div>
								) : (
									'Publish'
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default AdminDraw;
