import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import Actions from './Actions';

import { useGetLoanRequestsQuery } from '../../../features/loan/loanApi';

const LoanList = () => {
	const { data, isLoading } = useGetLoanRequestsQuery();
	const { loans } = data || [];

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
				<p className='text-green-500'>${params.row.amount}</p>
			),
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
						{params.row.status === 'rejected' && (
							<p className='text-orange-500 '>Rejected</p>
						)}
					</div>
				);
			},
		},

		{
			field: 'updateAt',
			headerName: 'Updated At',
			width: 150,
			renderCell: (params) => (
				<>
					<p className='text-green-500'>
						{params.row.status === 'approved' && params.row.updateAt}
					</p>
					<p className='text-orange-500'>
						{params.row.status === 'rejected' && params.row.updateAt}
					</p>
				</>
			),
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

	loans &&
		loans.map((loan) => {
			return rows.unshift({
				id: loan._id,
				name: loan.name,
				email: loan.email,
				date: formatDate(loan.createdAt),
				status: loan.status,
				updateAt: formatDate(loan.updatedAt),
				amount: loan.amount,
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

export default LoanList;
