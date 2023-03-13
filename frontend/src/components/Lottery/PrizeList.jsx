import React from 'react';

const prizeList = [
	{ id: 1, name: '1st Prize', amount: 1700, quantity: 1 },
	{ id: 2, name: '2nd Prize', amount: 500, quantity: 1 },
	{ id: 3, name: '3rd Prize', amount: 200, quantity: 1 },
	{ id: 4, name: '4th Prize', amount: 100, quantity: 1 },
	{ id: 5, name: '5th Prize', amount: 50, quantity: 6 },
];

const PrizeList = () => {
	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
			<table class='w-full text-sm text-left text-gray-400  '>
				<thead className='ml-4 text-xs text-gray-400 uppercase bg-gray-700'>
					<tr>
						<th className='pl-4 '>Prize</th>
						<th>Amount</th>
						<th>Qty</th>
					</tr>
				</thead>
				<tbody>
					{prizeList.map((prize) => (
						<tr
							key={prize.id}
							className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
						>
							<td className='pl-4'>{prize.name}</td>
							<td>${prize.amount}</td>
							<td>{prize.quantity}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PrizeList;
