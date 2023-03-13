import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import EditWithCrypto from './EditWithCrypto';
import EditWithBank from './EditWithBank';
import { useLocation, useParams } from 'react-router-dom';
import { useGetSingleWithdrawQuery } from '../../../features/withdraw/withdrawApi';
import WithdrawDetails from './WithdrawDetails';
import ApproveDetails from './ApproveDetails';
import CancelDetails from './CancelDetails';

const EditWithdraw = () => {
	const location = useLocation();
	const { id } = useParams();
	const { method } = location.state;
	const { data, isLoading } = useGetSingleWithdrawQuery(id);
	const { withdraw, withdrawDetails } = data || {};

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-6'>
					<h2 className='text-center text-sm'>
						<span className=' italic text-green-500'>{withdraw?.name}</span>{' '}
						Withdraw Details
					</h2>
					<WithdrawDetails
						withdraw={withdraw}
						withdrawDetails={withdrawDetails}
					/>
					{/* Approved Details */}
					{withdraw?.status === 'approved' && (
						<ApproveDetails withdraw={withdraw} />
					)}

					{/* Cancel Details */}
					{withdraw?.status === 'cancelled' && (
						<CancelDetails withdraw={withdraw} />
					)}
					{withdraw?.status === 'pending' && (
						<>
							{method === 'crypto' && <EditWithCrypto id={id} />}
							{method === 'bank' && <EditWithBank id={id} />}
						</>
					)}
				</div>
			)}
		</DashboardLayout>
	);
};

export default EditWithdraw;
