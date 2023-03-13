import React from 'react';
import Layout from '../../../layouts/Layout';

const Developers = () => {
	return (
		<Layout>
			<div className='pt-[62px] h-screen '>
				<div className='px-6 md:px-40'>
					<h1 className='text-[#FF7E00] text-3xl font-semibold'>Development</h1>
					<p className='mt-10 text-lg font-semibold leading-9 text-gray-100'>
						Payunx Core is security software that helps protect assets worth
						millions of dollars, so every code change needs to be reviewed by
						experienced developers. It can take a long time for other developers
						to review your pull requests. Remember that all reviewers are taking
						time away from their own projects to review your pull requests, so
						be patient and respectful of their time. Please also consider
						helping to review other people’s pull requests. You don’t need to be
						an expert in Payunx, the Payunx Core codebase, or C++ (although all
						these things help). There are almost always open pull requests that
						any programmer can review.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default Developers;
