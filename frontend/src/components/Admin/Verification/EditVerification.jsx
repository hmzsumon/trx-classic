import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import { useParams } from 'react-router-dom';

import VerificationDetails from './VerificationDetails';
import ApproveDetails from './ApproveDetails';
import { useGetVerificationQuery } from '../../../features/verify/verifyApi';
import Approve from './Approve';
import RejectDetails from './RejectDetails';

const EditVerification = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetVerificationQuery(id);
	const { verification } = data || {};

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-6'>
					<h2 className='text-sm text-center'>
						<span className='italic text-green-500 '>{verification?.name}</span>{' '}
						Verification Details
					</h2>
					<VerificationDetails verification={verification} />
					{/* Approved Details */}
					{verification?.status === 'approved' && (
						<ApproveDetails verification={verification} />
					)}
					{verification?.status === 'rejected' && (
						<RejectDetails verification={verification} />
					)}
					{verification?.status === 'pending' && <Approve id={id} />}
				</div>
			)}
		</DashboardLayout>
	);
};

export default EditVerification;
