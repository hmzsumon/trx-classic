import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Dashboard/Layout/Layout';
import { BsArrowLeftSquare } from 'react-icons/bs';

const Orders = () => {
	return (
		<Layout>
			<div className='h-screen'>
				<div className='w-11/12 h-[60%] mx-auto p-2 md:w-1/2 rounded bg-slate-800 mt-10'>
					<div className='flex flex-col items-center justify-center h-full space-y-5 '>
						<h1 className='text-2xl font-bold text-gray-100'>
							Order is coming soon
						</h1>
						<Link to='/dashboard' className='flex space-x-2 text-green-500 '>
							<span>
								<BsArrowLeftSquare className='text-2xl text-green-500' />
							</span>
							<span>Go Back</span>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Orders;
