import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import Moment from 'react-moment';
import { FadeLoader } from 'react-spinners';
import Layout from '../Dashboard/Layout/Layout';

import { Link } from 'react-router-dom';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { useGetMyWithdrawsQuery } from '../../features/withdraw/withdrawApi';

const MyWithdraws = () => {
	const { data, isLoading } = useGetMyWithdrawsQuery();
	const { withdraws } = data || [];

	const columns = [
		{
			field: 'createdAt',
			headerName: 'Created At',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div>
						<Moment format='DD/MM/YYYY'>{params.row.createdAt}</Moment>
					</div>
				);
			},
		},
		{
			field: 'amount',
			headerName: 'Amount',
			headerAlign: 'center',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return <div className='mx-auto '>{params.row.amount}$</div>;
			},
		},

		{
			field: 'status',
			headerName: 'Status',
			headerAlign: 'center',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div
						className={`mx-auto capitalize ${
							params.row.status === 'pending' && 'text-yellow-500'
						} ${params.row.status === 'approved' && 'text-green-500'} ${
							params.row.status === 'cancelled' && 'text-red-500'
						} `}
					>
						{params.row.status}
					</div>
				);
			},
		},
		{
			field: 'approvedAt',
			headerName: 'Update At',
			headerAlign: 'center',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto'>
						{params.row.approvedAt ? (
							<Moment format='DD/MM/YYYY'>
								{params.row.approvedAt
									? params.row.approvedAt
									: params.row.cancelledAt}
							</Moment>
						) : (
							<span className='text-red-500'>Not Update</span>
						)}
					</div>
				);
			},
		},
		{
			field: 'comment',
			headerName: 'Comment',
			headerAlign: 'center',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto'>
						{params.row.comment ? (
							<span className=' text-xs text-yellow-500 italic'>
								{params.row.comment}
							</span>
						) : (
							<span className='text-red-500 text-xs'>No Comment</span>
						)}
					</div>
				);
			},
		},
	];

	const rows = [];

	withdraws &&
		withdraws.forEach((withdraw) => {
			rows.unshift({
				id: withdraw._id,
				createdAt: withdraw.createdAt,
				amount: withdraw.amount,
				status: withdraw.status,
				approvedAt: withdraw.approved_at,
				cancelledAt: withdraw.cancelled_at,
				comment: withdraw.comment,
			});
		});

	return (
		<Layout>
			{isLoading ? (
				<div className='flex justify-center items-center mt-24 h-[80%]'>
					<FadeLoader color='#fff' />
				</div>
			) : (
				<div className='px-2 md:px-20'>
					<div className='flex space-x-4 items-center'>
						<Link
							to='/usdx-withdraw'
							className='flex space-x-2 text-green-500 '
						>
							<span>
								<BsArrowLeftSquare className='text-2xl text-green-500' />
							</span>
							<span>Go Back</span>
						</Link>
						<h1 className='my-4 text-lg font-medium '>
							My Withdraws: {withdraws && withdraws.length}
						</h1>
					</div>
					<div
						className='w-full shadow-lg bg-slate-800 rounded-xl'
						style={{ height: '60vh', width: '100%' }}
					>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={10}
							disableSelectIconOnClick
							sx={{
								boxShadow: 0,
								border: 0,
								padding: 1,
							}}
						/>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default MyWithdraws;
