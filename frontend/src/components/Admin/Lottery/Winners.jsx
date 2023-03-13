import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';

import { useGetAllWinnersQuery } from '../../../features/lottery/lotteryApi';

const Winners = ({ user }) => {
	const { data, isLoading } = useGetAllWinnersQuery();

	const { winners } = data || [];

	console.log(winners);

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-2 py-4 space-y-4'>
					<h2>Winners Dashboard</h2>
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
						</div>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default Winners;
