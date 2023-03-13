import React from 'react';
import { formatDate } from '../../../utils/functions';

const MerchantDetails = ({ merchant }) => {
	const {
		name,
		merchant_profit,
		total_send_amount,
		total_receive_amount,
		merchant_name,
		merchant_email,
		merchant_phone,
		status,
		createdAt,
		approved_at,
	} = merchant || {};
	return (
		<div>
			<div className=''>
				<div className='  mx-auto p-2  rounded bg-slate-800 my-4'>
					<div className=''>
						<h1 className='text-sm text-center my-4 space-x-2 font-bold text-gray-100'>
							<span
								className={`capitalize mr-2 ${
									status === 'pending' ? 'text-yellow-500' : 'text-green-500'
								}`}
							>
								{status}
							</span>
							Merchant Details
						</h1>

						<div className='border p-3'>
							<div className=' text-xs space-y-1'>
								<h2 className='text-center text-xs italic text-indigo-600'>
									Merchant Information:
								</h2>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Full Name</span>
										<span>:</span>
									</li>
									<li>{name}</li>
								</div>

								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Merchant Name</span>
										<span>:</span>
									</li>
									<li>{merchant_name}</li>
								</div>

								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Merchant Email</span>
										<span>:</span>
									</li>
									<li>{merchant_email}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Merchant Phone</span>
										<span>:</span>
									</li>
									<li>{merchant_phone}</li>
								</div>

								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Total Profit</span>
										<span>:</span>
									</li>
									<li>{Number(merchant_profit).toFixed(2)}$</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Total Send Amount</span>
										<span>:</span>
									</li>
									<li>{Number(total_send_amount).toFixed(2)}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2'>
										<span>Total Receive Amount</span>
										<span>:</span>
									</li>
									<li className='text-[0.6rem] '>
										{Number(total_receive_amount).toFixed(2)}
									</li>
								</div>

								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Approved At</span>
										<span>:</span>
									</li>
									<li>
										{approved_at ? formatDate(approved_at) : 'Not Approved Yet'}
									</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Request At</span>
										<span>:</span>
									</li>
									<li>{formatDate(createdAt)}</li>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MerchantDetails;
