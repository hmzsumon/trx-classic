import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import { useParams } from 'react-router-dom';

import Approve from './Approve';
import DepositDetails from './DepositDetails';
import { useGetSingleDepositQuery } from '../../../features/deposit/depositApi';
import ApproveDetails from './ApproveDetails';
import RejectDetails from './RejectDetails';

const EditDeposit = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetSingleDepositQuery(id);
	const { deposit } = data || {};
	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-6'>
					<DepositDetails deposit={deposit} />
					{deposit?.status === 'pending' && <Approve id={id} />}
					{/* Approved Details */}
					{deposit?.status === 'success' && (
						<ApproveDetails deposit={deposit} />
					)}
					{deposit?.status === 'cancelled' && (
						<RejectDetails deposit={deposit} />
					)}
				</div>
			)}
		</DashboardLayout>
	);
};

export default EditDeposit;
