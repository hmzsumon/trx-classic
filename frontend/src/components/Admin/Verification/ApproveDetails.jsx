import React from 'react';
import { formatDate } from '../../../utils/functions';

const ApproveDetails = ({ verification }) => {
	return (
		<div className='my-4 text-xs'>
			<h2 className=' text-center text-sm italic text-green-500 my-2'>
				Approved Info
			</h2>
			<div className='border px-3 py-2 space-y-1'>
				{/* Withdraw Date */}
				<div className='grid grid-cols-2'>
					<p> Approved Date:</p>
					<p>{formatDate(verification?.approved_at)}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Approved By:</p>
					<p>Admin</p>
				</div>

				<div className='grid grid-cols-2'>
					<p>Status:</p>
					<p
						className={`${
							verification?.status === 'approved' && 'text-green-500'
						} ${verification?.status === 'pending' && 'text-red-500'} ${
							verification?.status === 'cancelled' && 'text-yellow-500'
						}`}
					>
						{verification?.status}
					</p>
				</div>

				<div className='grid grid-cols-2'>
					<p>Method:</p>
					<p>{verification?.method}</p>
				</div>
				{verification?.method === 'bank' && (
					<>
						<div className='grid grid-cols-2'>
							<p>Bank Name:</p>
							<p>{verification?.bank.bank_name}</p>
						</div>
						{/* Branch name */}
						<div className='grid grid-cols-2'>
							<p>Branch Name:</p>
							<p>{verification?.bank.branch_name}</p>
						</div>
						{/* Swift Code */}

						<div className='grid grid-cols-2'>
							<p>Swift Code:</p>
							<p>{verification?.bank.swift_code}</p>
						</div>

						<div className='grid grid-cols-2'>
							<p>Account Name:</p>
							<p>{verification?.bank.account_name}</p>
						</div>
						<div className='grid grid-cols-2'>
							<p>Account Number:</p>
							<p>{verification?.bank.account_number}</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ApproveDetails;
