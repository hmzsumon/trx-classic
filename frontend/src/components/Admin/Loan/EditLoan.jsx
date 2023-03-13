import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import { useParams } from 'react-router-dom';
import { useGetSingleLoanQuery } from '../../../features/loan/loanApi';
import LoanDetails from './LoanDetails';
import Approve from './Approve';

const EditLoan = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetSingleLoanQuery(id);
	const { loan } = data || {};
	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-6'>
					<LoanDetails loan={loan} />
					{loan?.status === 'pending' && <Approve id={id} />}
				</div>
			)}
		</DashboardLayout>
	);
};

export default EditLoan;
