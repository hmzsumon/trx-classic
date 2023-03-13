import React from 'react';

const MerchantCard = ({ title = 'Admin Info', merchant }) => {
	return (
		<div className='p-2 border border-blue-700 rounded-md bg-slate-700'>
			<h3 className='text-xs italic font-semibold text-center'>{title}</h3>
			<div className='my-2 space-y-2 '>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						New Merchant: {merchant?.new_merchant}
					</p>
					<p className='text-xs italic font-semibold'>
						Pending: {merchant?.pending_request}
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Today merchant: {merchant?.total_merchant}
					</p>
					<p className='text-xs italic font-semibold'>
						Total profit: {merchant?.total_merchant_profit}
					</p>
				</div>
			</div>
		</div>
	);
};

export default MerchantCard;
