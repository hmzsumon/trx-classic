import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import { useParams } from 'react-router-dom';

import Approve from './Approve';

import ApproveDetails from './ApproveDetails';
import RejectDetails from './RejectDetails';
import { useGetMerchantQuery } from '../../../features/merchant/merchantApi';
import MerchantDetails from './MerchantDetails';

const EditMerchant = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetMerchantQuery(id);
	const { merchant } = data || {};
	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-6'>
					<MerchantDetails merchant={merchant} />
					{merchant?.status === 'pending' && <Approve id={id} />}
					{/* Approved Details */}
					{merchant?.status === 'success' && (
						<ApproveDetails merchant={merchant} />
					)}
					{merchant?.status === 'cancelled' && (
						<RejectDetails merchant={merchant} />
					)}
				</div>
			)}
		</DashboardLayout>
	);
};

export default EditMerchant;
