import React from 'react';
import { formatDate } from '../../../utils/functions';

const ApproveDetails = ({ withdraw }) => {
	return (
		<div className='my-4 text-xs'>
			<h2 className='my-2 text-sm italic text-center text-green-500 '>
				Approved Info
			</h2>
			<div className='px-3 py-2 space-y-1 border'>
				{/* Withdraw Date */}
				<div className='grid grid-cols-2'>
					<p> Approved Date:</p>
					<p>{formatDate(withdraw?.approved_at)}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Approved By:</p>
					<p>Admin</p>
				</div>

				<div className='grid grid-cols-2'>
					<p>Status:</p>
					<p
						className={`${withdraw.status === 'approved' && 'text-green-500'} ${
							withdraw.status === 'pending' && 'text-red-500'
						} ${withdraw.status === 'cancelled' && 'text-yellow-500'}`}
					>
						{withdraw?.status}
					</p>
				</div>

				<div className='grid grid-cols-2'>
					<p>Method:</p>
					<p>{withdraw?.wallet}</p>
				</div>
				{withdraw?.method === 'bank' && (
					<>
						<div className='grid grid-cols-2'>
							<p>Bank Name:</p>
							<p>{withdraw?.bank.bank_name}</p>
						</div>
						{/* Branch name */}
						<div className='grid grid-cols-2'>
							<p>Branch Name:</p>
							<p>{withdraw?.bank.branch_name}</p>
						</div>
						{/* Swift Code */}

						<div className='grid grid-cols-2'>
							<p>Swift Code:</p>
							<p>{withdraw?.bank.swift_code}</p>
						</div>

						<div className='grid grid-cols-2'>
							<p>Account Name:</p>
							<p>{withdraw?.bank.account_name}</p>
						</div>
						<div className='grid grid-cols-2'>
							<p>Account Number:</p>
							<p>{withdraw?.bank.account_number}</p>
						</div>
					</>
				)}

				{withdraw?.method === 'crypto' && (
					<>
						<div className='grid grid-cols-2'>
							<p>Approved Wallet:</p>
							<p>{withdraw?.approved_crypto.crypto_name}</p>
						</div>
						<div className='grid grid-cols-2'>
							<p>Wallet Address:</p>
							<p>{withdraw?.approved_crypto.wallet_address}</p>
						</div>
						<div className='grid grid-cols-2'>
							<p>Transaction ID:</p>
							<p>{withdraw?.approved_crypto.tnx_id}</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ApproveDetails;
