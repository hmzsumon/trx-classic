import React from 'react';
import { formatDate } from '../../../utils/functions';

const DepositDetails = ({ deposit }) => {
	const {
		username,
		amount,
		walletName,
		walletAddress,
		status,
		createdAt,
		transactionId,
		paidAt,
	} = deposit || {};
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
							Deposit Details
						</h1>

						<div className='border p-3'>
							<div className=' text-xs space-y-1'>
								<h2 className='text-center text-xs italic text-indigo-600'>
									Deposit Information:
								</h2>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Full Name</span>
										<span>:</span>
									</li>
									<li>{username}</li>
								</div>

								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Amount</span>
										<span>:</span>
									</li>
									<li>{amount}$</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Method</span>
										<span>:</span>
									</li>
									<li>{walletName}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2'>
										<span>Wallet Address</span>
										<span>:</span>
									</li>
									<li className='text-[0.6rem] '>{walletAddress}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Transaction Id</span>
										<span>:</span>
									</li>
									<li>{transactionId}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Paid At</span>
										<span>:</span>
									</li>
									<li>{paidAt ? formatDate(paidAt) : 'Not Paid Yet'}</li>
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

export default DepositDetails;
