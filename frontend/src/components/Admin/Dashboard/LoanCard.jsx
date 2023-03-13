import React from 'react';

const LoanCard = ({ title = 'Admin Info', loan }) => {
	return (
		<div className='p-2 border border-blue-700 rounded-md bg-slate-700'>
			<h3 className='text-xs italic font-semibold text-center'>{title}</h3>
			<div className='my-2 space-y-2 '>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						New Request: {loan?.pending_request}
					</p>
					<p className='text-xs italic font-semibold'>
						Pending: {loan?.pending}
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Total Loan: {loan?.total_loan_amount}
					</p>
					<p className='text-xs italic font-semibold'>
						Rejected: {loan?.rejected}
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoanCard;
