import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import { useGetCompanyAdminQuery } from '../../../features/admin/adminApi';

import Menu from './Menu';
import WithdrawCard from './WithdrawCard';

const Withdraw = () => {
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
					<h2>Admin Withdraw </h2>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 '>
						<WithdrawCard title='Withdraw Info' withdraw={company?.withdraw} />
						<Menu />
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default Withdraw;
