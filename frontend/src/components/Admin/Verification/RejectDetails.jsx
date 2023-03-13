import React from 'react';
import { formatDate } from '../../../utils/functions';

const RejectDetails = ({ verification }) => {
	return (
		<div className='my-4 text-xs'>
			<h2 className=' text-center text-sm italic text-green-500 my-2'>
				Reject Info
			</h2>
			<div className='border px-3 py-2 space-y-1'>
				{/* Withdraw Date */}
				<div className='grid grid-cols-2'>
					<p> Reject Date:</p>
					<p>{formatDate(verification?.rejected_at)}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Reject By:</p>
					<p>{verification?.update_by.name}</p>
				</div>

				<div className='grid grid-cols-2'>
					<p>Reject Reason:</p>
					<p className=' text-red-500 italic'>
						{verification?.reject_reason
							? verification?.reject_reason
							: 'No Reason'}
					</p>
				</div>

				<div className='grid grid-cols-2'>
					<p>Status:</p>
					<p
						className={`${
							verification.status === 'approved' && 'text-green-500'
						} ${verification.status === 'pending' && 'text-red-500'} ${
							verification.status === 'cancelled' && 'text-yellow-500'
						}`}
					>
						{verification?.status}
					</p>
				</div>

				<div className='grid grid-cols-2'>
					<p>Method:</p>
					<p>{verification?.method}</p>
				</div>
			</div>
		</div>
	);
};

export default RejectDetails;
