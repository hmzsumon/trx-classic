import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import { NavLink } from 'react-router-dom';
import { useGetAllNoticesQuery } from '../../../features/notice/noticeApi';

const NoticeList = () => {
	const { data, isLoading } = useGetAllNoticesQuery();
	const { notices } = data || [];

	const columns = [
		{
			field: 'date',
			headerName: 'Create Date',
			width: 150,
		},

		{
			field: 'description',
			headerName: 'Notice',
			width: 150,
		},
		{
			field: 'active',
			headerName: 'Status',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='flex items-center'>
						{params.row.active ? (
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

	notices &&
		notices.map((notice) => {
			return rows.unshift({
				id: notice._id,
				description: notice.description,
				date: formatDate(notice.createdAt),
				status: notice.status,
				updateAt: formatDate(notice.updatedAt),
				active: notice.active,
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
							to='/create-notice'
							state={{ activeNotice: notices[notices.length - 1] }}
							className='px-2 py-1 bg-green-500 rounded-sm '
						>
							Create New Notice
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

export default NoticeList;
