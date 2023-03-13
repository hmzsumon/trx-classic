import React from 'react';
import Layout from './Layout/Layout';
import { NavLink } from 'react-router-dom';

const History = () => {
	return (
		<Layout>
			<div className='flex items-center justify-center pt-40'>
				<div className='space-x-4 '>
					<NavLink to='/buy-history'>
						<button className='px-3 py-2 text-sm font-semibold text-gray-100 list-none bg-green-400 rounded-md cursor-pointer'>
							Buy History
						</button>
					</NavLink>

					<NavLink to='/all-history'>
						<button className='px-3 py-2 text-sm font-semibold text-gray-100 list-none bg-yellow-400 rounded-md cursor-pointer'>
							All History
						</button>
					</NavLink>
				</div>
			</div>
		</Layout>
	);
};

export default History;
