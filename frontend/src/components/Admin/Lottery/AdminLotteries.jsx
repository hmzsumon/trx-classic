import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import { useGetCompanyAdminQuery } from '../../../features/admin/adminApi';
import LotteryCard from '../Dashboard/LotteryCard';
import Menu from './Menu';

const AdminLotteries = () => {
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
					<h2>Lottery </h2>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 '>
						<LotteryCard title='Lottery Info' lottery={company?.lottery} />
						<Menu />
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default AdminLotteries;
