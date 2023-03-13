import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import Layout from '../Dashboard/Layout/Layout';
import { formatDate } from '../../utils/functions';

import { useGetDrawByDateQuery } from '../../features/lottery/lotteryApi';

const Winners = ({ user }) => {
	const date = new Date().toLocaleDateString();
	const { data, isLoading } = useGetDrawByDateQuery(date);

	const { draw } = data || [];

	console.log(draw);

	return (
		<Layout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-4 py-4 space-y-4'>
					<h2>
						Today Win:{' '}
						<span className='text-xs italic font-semibold text-yellow-500'>
							{formatDate(draw?.drawDate)}
						</span>
					</h2>
					<div className=''>
						<div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
							<table class='w-full text-sm text-left  text-gray-400  '>
								<thead className='ml-4 text-xs text-gray-400 uppercase bg-gray-700'>
									<tr>
										<th className='py-2 pl-4 '>Winner Name</th>
										<th>Ticket No.</th>
										<th>Position</th>
										<th>Prize</th>
									</tr>
								</thead>
								<tbody>
									{draw?.winners.map((winner) => (
										<tr
											key={winner._id}
											className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
										>
											<td className='py-1 pl-4'>{winner.winner_name}</td>
											<td className='py-1'>{winner.ticket_number}</td>
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
		</Layout>
	);
};

export default Winners;
