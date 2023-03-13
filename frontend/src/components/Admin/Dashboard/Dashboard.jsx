import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import { useGetCompanyAdminQuery } from '../../../features/admin/adminApi';

import LotteryCard from './LotteryCard';
import WithdrawCard from './WithdrawCard';
import VerificationCard from './VerificationCard';
import LoanCard from './LoanCard';
import DepositCard from './DepositCard';
import MerchantCard from './MerchantCard';

const Dashboard = ({ user }) => {
	const { data, isLoading } = useGetCompanyAdminQuery();
	const { company } = data || {};

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-2 py-4 space-y-4'>
					<h2>Admin Dashboard</h2>
					<div className='grid grid-cols-2 gap-4 md:grid-cols-4 '>
						<LotteryCard title='Lottery Info' lottery={company?.lottery} />
						<DepositCard title='Deposit Info' deposit={company?.deposit} />
						<WithdrawCard title='Withdraw Info' withdraw={company?.withdraw} />
						<VerificationCard title='Verification' verify={company?.verify} />
						<LoanCard title='Loan Info' loan={company?.loan} />
						<MerchantCard title='Merchant Info' merchant={company?.merchant} />
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default Dashboard;
