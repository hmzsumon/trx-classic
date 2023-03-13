import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import Moment from 'react-moment';
import { FadeLoader } from 'react-spinners';
import Layout from '../Dashboard/Layout/Layout';
import { useGetMyTicketsQuery } from '../../features/lottery/lotteryApi';
import { Link } from 'react-router-dom';
import { BsArrowLeftSquare } from 'react-icons/bs';

const MyLotteries = () => {
	const { data, isLoading } = useGetMyTicketsQuery();
	const { tickets } = data || [];

	const columns = [
		{
			field: 'createdAt',
			headerName: 'Buy Date',
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
			field: 'ticketNumber',
			headerName: 'Ticket Number',
			headerAlign: 'center',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return <div className='mx-auto '>{params.row.ticketNumber}</div>;
			},
		},
		{
			field: 'price',
			headerName: 'Price',
			headerAlign: 'center',
			type: 'number',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto '>
						{params.row.price.toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</div>
				);
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
						<Link to='/lottery' className='flex space-x-2 text-green-500 '>
							<span>
								<BsArrowLeftSquare className='text-2xl text-green-500' />
							</span>
							<span>Go Back</span>
						</Link>
						<h1 className='my-4 text-lg font-medium '>
							My Tickets: {tickets && tickets.length}
						</h1>
					</div>
					<div
						className='w-full shadow-lg bg-slate-800 rounded-xl'
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
			)}
		</Layout>
	);
};

export default MyLotteries;
