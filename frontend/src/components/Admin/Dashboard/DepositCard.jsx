import React from 'react';

const DepositCard = ({ title = 'Admin Info', deposit }) => {
	return (
		<div className='p-2 border border-blue-700 rounded-md bg-slate-700'>
			<h3 className='text-xs italic font-semibold text-center'>{title}</h3>
			<div className='my-2 space-y-2 '>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						New Request: {deposit?.new_deposit_amount}${' '}
						<sup className='text-orange-500'>{deposit?.new_deposit_count}</sup>
					</p>
					<p className='text-xs italic font-semibold'>
						Pending: {deposit?.pending}
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Total deposit: {deposit?.totalDepositAmount}$
						<sup className='text-orange-500'>{deposit?.todayDepositCount}</sup>
					</p>
					<p className='text-xs italic font-semibold'>
						Rejected: {deposit?.rejected}
					</p>
				</div>
			</div>
		</div>
	);
};

export default DepositCard;
