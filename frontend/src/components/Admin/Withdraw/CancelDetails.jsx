import React from 'react';
import { formatDate } from '../../../utils/functions';

const CancelDetails = ({ withdraw }) => {
	return (
		<div className='my-4 text-xs'>
			<h2 className=' text-center text-sm italic text-green-500 my-2'>
				Cancel Info
			</h2>
			<div className='border px-3 py-2 space-y-1'>
				{/* Withdraw Date */}
				<div className='grid grid-cols-2'>
					<p> Cancel Date:</p>
					<p>{formatDate(withdraw?.cancelled_at)}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Cancel By:</p>
					<p>Admin</p>
				</div>

				<div className='grid grid-cols-2'>
					<p>Cancel Reason:</p>
					<p className=' text-red-500 italic'>{withdraw?.cancelled_reason}</p>
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
					<p>{withdraw?.method}</p>
				</div>
			</div>
		</div>
	);
};

export default CancelDetails;
