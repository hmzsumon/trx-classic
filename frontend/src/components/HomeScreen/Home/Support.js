import React from 'react';
import Layout from '..';

const Support = () => {
	return (
		<Layout>
			<div className='h-screen support' id='support'>
				<div className='flex flex-col items-center h-screen pt-24 space-y-6'>
					<div className=' border-2 px-12 rounded-md flex text-center items-center py-4 border-[#174C57]'>
						<h1 className=' text-5xl  text-[#174C57] font-bold '>Support</h1>
					</div>
					<h1 className='w-full text-xl px-6  font-bold   ] text-center text-[#131313] line md:w-9/12'>
						support@payunx.com
					</h1>
				</div>
			</div>
		</Layout>
	);
};

export default Support;
