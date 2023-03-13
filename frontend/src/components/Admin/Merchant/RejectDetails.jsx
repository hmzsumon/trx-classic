import React from 'react';
import { formatDate } from '../../../utils/functions';

const RejectDetails = ({ deposit }) => {
	return (
		<div className='my-4 text-xs'>
			<h2 className=' text-center text-sm italic text-red-500 my-2'>
				Cancelled Info
			</h2>
			<div className='border px-3 py-2 space-y-1'>
				{/* Withdraw Date */}
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Cancelled At</span>
						<span>:</span>
					</li>
					<li>{formatDate(deposit?.updatedAt) || 'Not Approved Yet'}</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Approved By</span>
						<span>:</span>
					</li>
					<li>
						{deposit?.update_by?.name ? deposit?.update_by?.name : 'Admin'}
					</li>
				</div>

				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Cancelled Reason</span>
						<span>:</span>
					</li>
					<li>{deposit?.reason ? deposit?.reason : 'No Reason'}</li>
				</div>
			</div>
		</div>
	);
};

export default RejectDetails;
