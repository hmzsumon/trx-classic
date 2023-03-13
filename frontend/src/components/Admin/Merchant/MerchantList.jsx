import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import Actions from './Actions';

import { useGetMerchantsQuery } from '../../../features/merchant/merchantApi';

const MerchantList = () => {
	const { data, isLoading } = useGetMerchantsQuery();
	const { merchants } = data || [];

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
			headerName: 'User Name',
			width: 160,
		},
		{
			field: 'merchant_name',
			headerName: 'Merchant Name',
			width: 160,
		},

		{
			field: 'profit',
			headerName: 'Profit',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			renderCell: (params) => (
				<div className='flex items-center gap-2'>
					<p>{Number(params.row.profit).toFixed(2)} $</p>
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
						{params.row.status === 'success' && (
							<p className='text-green-500'>Approved</p>
						)}
						{params.row.status === 'cancelled' && (
							<p className='text-orange-500 '>Cancelled</p>
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
						{params.row.status === 'success' && params.row.updateAt}
					</p>
					<p className='text-orange-500'>
						{params.row.status === 'rejected' && params.row.updateAt}
					</p>
					<p className='text-orange-500'>
						{params.row.status === 'cancelled' && params.row.updateAt}
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
						editRoute={'merchant'}
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

	merchants &&
		merchants.map((merchant) => {
			return rows.unshift({
				id: merchant._id,
				name: merchant.name,
				date: formatDate(merchant.createdAt),
				status: merchant.status,
				updateAt: formatDate(merchant.updatedAt),
				profit: merchant.merchant_profit,
				merchant_name: merchant.merchant_name,
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

export default MerchantList;
