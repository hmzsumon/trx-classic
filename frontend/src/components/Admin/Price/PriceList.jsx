import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import { useGetPricesQuery } from '../../../features/prices/priceApi';
import { NavLink } from 'react-router-dom';

const PriceList = () => {
	const { data, isLoading } = useGetPricesQuery();
	const { prices } = data || {};

	const columns = [
		{
			field: 'date',
			headerName: 'Create Date',
			width: 150,
		},

		{
			field: 'value',
			headerName: 'Value',
			width: 150,
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='flex items-center'>
						{prices[prices.length - 1]._id === params.row.id ? (
							<span className='px-2 py-1 text-xs font-bold text-green-800 bg-green-100 rounded-full'>
								Active
							</span>
						) : (
							<span className='px-2 py-1 text-xs font-bold text-red-800 bg-red-100 rounded-full'>
								Inactive
							</span>
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
					<p className='text-orange-500 '>No update yet</p>
				</>
			),
		},
	];

	const rows = [];

	prices &&
		prices.map((price) => {
			return rows.unshift({
				id: price._id,
				value: price.price,
				date: formatDate(price.createdAt),
				status: price.status,
				updateAt: formatDate(price.updatedAt),
				amount: price.amount,
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
					<div className='my-4'>
						<NavLink
							to='/create-price'
							className='px-2 py-1 bg-green-500 rounded-sm '
						>
							Create New Price
						</NavLink>
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

export default PriceList;
