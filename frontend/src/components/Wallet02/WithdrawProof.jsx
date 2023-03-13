import React from 'react';
import Layout from '../Dashboard/Layout/Layout';
import FadeLoader from 'react-spinners/FadeLoader';
import { useGetAllApprovedWithdrawsQuery } from '../../features/withdraw/withdrawApi';

import { formatDate } from '../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

const WithdrawProof = () => {
	const { data, isLoading } = useGetAllApprovedWithdrawsQuery();
	const { withdraws } = data || [];

	const columns = [
		{
			field: 'date',
			headerName: 'Date',
			width: 150,
		},
		{
			field: 'method',
			headerName: 'Network',
			headerAlign: 'center',
			width: 100,
			renderCell: (params) => (
				<div className='mx-auto '>
					<p className='capitalize '>{params.row.method}</p>
				</div>
			),
		},

		{
			field: 'crypto_name',
			headerName: 'Method',
			headerAlign: 'center',
			width: 150,
			renderCell: (params) => (
				<div className='mx-auto '>
					<p className='text-xs capitalize'>{params.row.crypto_name}</p>
				</div>
			),
		},

		{
			field: 'address',
			headerName: 'Receive Address',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 250,
			renderCell: (params) => (
				<div className='flex items-center'>
					<p className='text-xs italic font-bold text-green-500 '>
						{params.row.address}
					</p>
				</div>
			),
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
	];

	const rows = [];

	withdraws &&
		withdraws.map((withdraw) => {
			return rows.unshift({
				id: withdraw._id,
				name: withdraw.name,
				address: withdraw.crypto.wallet_address,
				date: formatDate(withdraw.createdAt),
				amount: withdraw.amount,
				method: withdraw.method,
				status: withdraw.status,
				crypto_name: withdraw.crypto.crypto_name,
			});
		});
	return (
		<Layout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-4'>
					<div
						className='w-full shadow-lg rounded-xl'
						style={{ height: '60vh', width: '100%' }}
					>
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
		</Layout>
	);
};

export default WithdrawProof;

// sx={{
// 								border: 'none',
// 								'& .MuiDataGrid-row': {
// 									border: 'none',
// 									'& .MuiDataGrid-cell': {
// 										color: 'red',
// 										border: 'none',
// 									},
// 								},
// 							}}
