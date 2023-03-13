import React from 'react';

import Layout from '../Dashboard/Layout/Layout';
import { formatDate } from '../../utils/functions';
import { useGetDepositsQuery } from '../../features/pxc.js/pxcApi';

const BuyHistory = () => {
	const { data } = useGetDepositsQuery();
	const { deposits } = data || [];
	return (
		<Layout>
			<div className='h-screen '>
				<div className='w-11/12 px-2 py-4 mx-auto space-y-4 rounded-md bg-slate-800 md:w-9/12'>
					<h1>Buy History</h1>
					<div>
						<table className='block min-w-full border-collapse md:table'>
							<thead className='block md:table-header-group'>
								<tr className='absolute block border border-grey-500 md:border-none md:table-row -top-full md:top-auto -left-full md:left-auto md:relative '>
									<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
										Deposit id:
									</th>
									<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
										Amount
									</th>
									<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
										Date
									</th>

									<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
										Status
									</th>
								</tr>
							</thead>
							<tbody className='block md:table-row-group'>
								{deposits &&
									deposits.map((deposit) => (
										<tr
											key={deposit._id}
											className='block border border-grey-500 md:border-none md:table-row'
										>
											<td className='block px-1 py-2 text-left md:border md:border-grey-500 md:table-cell'>
												<span className='inline-block w-1/3 font-bold md:hidden'>
													Deposit id:
												</span>
												{deposit._id}
											</td>
											<td className='block px-1 py-2 text-left md:border md:border-grey-500 md:table-cell'>
												<span className='inline-block w-1/3 font-bold md:hidden'>
													Amount:
												</span>
												{deposit.amount}
											</td>
											<td className='block p-2 text-left md:border md:border-grey-500 md:table-cell'>
												<span className='inline-block w-1/3 font-bold md:hidden'>
													Date:
												</span>

												{formatDate(deposit.createdAt)}
											</td>

											<td
												className={`block p-2 text-left md:border md:border-grey-500 md:table-cell ${
													deposit.status === 'pending'
														? 'text-yellow-500'
														: 'text-green-500'
												}`}
											>
												<span className='inline-block w-1/3 font-bold md:hidden'>
													Status:
												</span>
												{deposit.status}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default BuyHistory;
