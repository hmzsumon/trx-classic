import React from 'react';
import { formatDate } from '../../../utils/functions';
import CopyIcon from '../../../global/CopyIcon';

const WithdrawDetails = ({ withdraw, withdrawDetails }) => {
	return (
		<div className='my-4 text-xs'>
			<div className='px-3 py-2 space-y-1 border'>
				<div className='grid grid-cols-2'>
					<p>Name:</p>
					<p>{withdraw?.name}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Email:</p>
					<p>{withdraw?.email}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Amount:</p>
					<p>{withdraw?.amount}$</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Charge:</p>
					<p>{Number(withdraw.charge ? withdraw.charge : 0).toFixed(2)}$</p>
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
				{/* Withdraw Date */}
				<div className='grid grid-cols-2'>
					<p>Date:</p>
					<p>{formatDate(withdraw?.createdAt)}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Wallet:</p>
					<p>{withdraw?.wallet}</p>
				</div>

				<div className=' grid grid-cols-2'>
					<p>Wallet Address:</p>
					<div className=' flex space-x-2'>
						<p className='text-orange-500'>{withdraw?.address}</p>
						<CopyIcon text={withdraw?.address} />
					</div>
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
							<p>Crypto Name:</p>
							<p>{withdraw?.crypto.crypto_name}</p>
						</div>
						<div className='grid grid-cols-2'>
							<p>Wallet Address:</p>
							<p>{withdraw?.crypto.wallet_address}</p>
						</div>
					</>
				)}
				<hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
				<div className='grid grid-cols-2'>
					<p>Last Withdraw amount:</p>
					<p>{withdrawDetails?.last_withdraw_amount}$</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Last Withdraw Date:</p>
					<p>{formatDate(withdrawDetails?.last_withdraw_date)}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Total Withdraw:</p>
					<p>{withdrawDetails?.total_withdraw}$</p>
				</div>
			</div>
		</div>
	);
};

export default WithdrawDetails;
