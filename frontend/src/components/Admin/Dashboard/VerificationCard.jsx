import React from 'react';

const VerificationCard = ({ title = 'Admin Info', verify }) => {
	return (
		<div className='p-2 border border-blue-700 rounded-md bg-slate-700'>
			<h3 className='text-xs italic font-semibold text-center'>{title}</h3>
			<div className='my-2 space-y-2 '>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						New Request: {verify?.new_verify}
					</p>
					<p className='text-xs italic font-semibold'>
						Pending: {verify?.pending}
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Verified: {verify?.verified}
					</p>
					<p className='text-xs italic font-semibold'>
						Rejected: {verify?.rejected}
					</p>
				</div>
			</div>
		</div>
	);
};

export default VerificationCard;
