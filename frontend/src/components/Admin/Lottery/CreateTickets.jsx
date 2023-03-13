import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import { useGetCompanyAdminQuery } from '../../../features/admin/adminApi';

const CreateTickets = ({ user }) => {
	const { isLoading } = useGetCompanyAdminQuery();

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-2 py-4 space-y-4'>
					<h2>Create Tickets Dashboard</h2>
				</div>
			)}
		</DashboardLayout>
	);
};

export default CreateTickets;
