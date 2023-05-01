import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import { useGetAllWithdrawsQuery } from '../../../features/withdraw/withdrawApi';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import Actions from './Actions';

const Withdraws = () => {
	const { data, isLoading } = useGetAllWithdrawsQuery();
	const { withdraws } = data || [];

	// handle delete user
	const handleDelete = () => {
		console.log('delete');
	};

	// handle cancel withdraw
	const cancelWithdraw = () => {
		console.log('cancel');
	};

	const columns = [
		{
			field: 'date',
			headerName: 'Date',
			width: 150,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 160,
		},

		{
			field: 'email',
			headerName: 'Email',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
		},
		{
			field: 'amount',
			headerName: 'Amount',
			width: 150,
			renderCell: (params) => (
				<div className='flex items-center'>
					<p>$ {params.row.amount}</p>
				</div>
			),
		},
		{
			field: 'method',
			headerName: 'Method',
			width: 150,
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='flex items-center'>
						{params.row.status === 'pending' && (
							<p className='text-red-500'>Pending</p>
						)}
						{params.row.status === 'approved' && (
							<p className='text-green-500'>Approved</p>
						)}
						{params.row.status === 'cancelled' && (
							<p className='text-yellow-600 '>Canceled</p>
						)}
					</div>
				);
			},
		},

		{
			field: 'action',
			headerName: 'Action',
			width: 160,
			renderCell: (params) => {
				return (
					<Actions
						editRoute={'user'}
						deleteHandler={handleDelete}
						cancelWithdraw={cancelWithdraw}
						status={params.row.status}
						id={params.row.id}
						method={params.row.method}
					/>
				);
			},
		},
	];

	const rows = [];

	withdraws &&
		withdraws.map((withdraw) => {
			return rows.unshift({
				id: withdraw._id,
				name: withdraw.name,
				email: withdraw.email,
				date: formatDate(withdraw.createdAt),
				amount: withdraw.amount,
				method: withdraw.wallet,
				status: withdraw.status,
			});
		});
	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-4'>
					<div className='my-2 '>
						<h2 className='text-xl font-semibold'>
							All Withdraws : {withdraws?.length}
						</h2>
					</div>
					<div className='w-full shadow-lg rounded-xl' style={{ height: 470 }}>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={20}
							rowsPerPageOptions={[20]}
							checkboxSelection={false}
							onSelectionModelChange={(id) => {}}
						/>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default Withdraws;
