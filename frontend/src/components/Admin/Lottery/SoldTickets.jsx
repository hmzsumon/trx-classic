import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import Moment from 'react-moment';
import { DataGrid } from '@mui/x-data-grid';

import { useGetAllSoldTicketsQuery } from '../../../features/lottery/lotteryApi';

const SoldTickets = ({ user }) => {
	const { data, isLoading } = useGetAllSoldTicketsQuery();
	const { tickets } = data || [];

	const columns = [
		{
			field: 'createdAt',
			headerName: 'Buy Date',
			minWidth: 100,
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
			field: 'ticketNumber',
			headerName: 'Ticket Number',
			headerAlign: 'center',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return <div className='mx-auto '>{params.row.ticketNumber}</div>;
			},
		},
		{
			field: 'ownerName',
			headerName: 'Owner Name',
			headerAlign: 'center',
			type: 'number',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return <div className='mx-auto '>{params.row.ownerName}</div>;
			},
		},
		{
			field: 'result',
			headerName: 'Result',
			headerAlign: 'center',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return <div className='mx-auto'>{params.row.result}</div>;
			},
		},
		{
			field: 'nextDrawDate',
			headerName: 'Next Draw Date',
			headerAlign: 'center',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto'>
						<Moment format='DD/MM/YYYY hh:mm a'>
							{params.row.nextDrawDate}
						</Moment>
					</div>
				);
			},
		},
	];

	const rows = [];

	tickets &&
		tickets.forEach((ticket) => {
			rows.unshift({
				id: ticket._id,
				buyDate: ticket.buyDate,
				ticketNumber: ticket.ticketNumber,
				price: ticket.price,
				result: ticket.result,
				nextDrawDate: ticket.nextDrawDate,
				ownerName: ticket.ownerName,
			});
		});

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div>
					<div className='px-2 md:px-20'>
						<h1 className='my-4 text-lg font-medium '>
							All Sold Tickets: {tickets && tickets.length}
						</h1>
						<div
							className='w-full border shadow-lg bg-slate-800 rounded-xl'
							style={{ height: 470 }}
						>
							<DataGrid
								rows={rows}
								columns={columns}
								pageSize={100}
								disableSelectIconOnClick
								sx={{
									boxShadow: 0,
									border: 0,
								}}
							/>
						</div>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default SoldTickets;
