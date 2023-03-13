import React from 'react';

const WithdrawCard = ({ title = 'Admin Info', withdraw }) => {
	return (
		<div className='p-2 border border-blue-700 rounded-md bg-slate-700'>
			<h3 className='text-xs italic font-semibold text-center'>{title}</h3>
			<div className='my-2 space-y-2 '>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						New Withdraw: {withdraw?.new_withdraw}
					</p>
					<p className='text-xs italic font-semibold'>
						Pending: {withdraw?.pending_withdraw_count}
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Today Withdraw: {withdraw?.todayWithdraw}
					</p>
					<p className='text-xs italic font-semibold'>
						Total Withdraw: {withdraw?.totalWithdraw}
					</p>
				</div>
			</div>
		</div>
	);
};

export default WithdrawCard;
