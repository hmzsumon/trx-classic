import React from 'react';
import { Link } from 'react-router-dom';

const PriceList = ({
	title,
	chance,
	lastPrice,
	supply,
	marketCap,
	bgColor,
	link,
}) => {
	return (
		<div className='rounded-md bg-slate-800 '>
			<div className='p-3'>
				<h1 className='italic font-semibold '> Price History</h1>
				<div>
					<table className='space-y-2'>
						<thead className='grid grid-cols-2 text-xs italic '>
							<div className='col-span-1 '>
								<tr className=''>
									<th>Pair</th>
								</tr>
							</div>
							<div className='flex items-center justify-between w-full col-span-1 '>
								<tr>
									<th>Price</th>
								</tr>
								<tr>
									<th>Total Supply</th>
								</tr>
								<tr>
									<th>Market Cap</th>
								</tr>
								<tr className=''>
									<th>Change</th>
								</tr>
							</div>
						</thead>
						<tbody className='grid grid-cols-2 text-sm '>
							<div className='col-span-1 '>
								<tr className=''>
									<td>
										<Link to={link} className='text-xs italic text-blue-500 '>
											{title}
										</Link>
									</td>
								</tr>
							</div>
							<div className='grid items-center justify-between w-full grid-cols-4 col-span-1 space-x-5 '>
								<tr>
									<td className='text-yellow-400 '>{lastPrice}</td>
								</tr>
								<tr>
									<td className='text-yellow-400 '>${supply}</td>
								</tr>
								<tr>
									<td className='text-yellow-400 '>${marketCap}</td>
								</tr>
								<tr className={`px-4 w-20 py-1 rounded ${bgColor} `}>
									<td>{chance}</td>
								</tr>
							</div>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PriceList;
