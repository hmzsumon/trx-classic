import React from 'react';
import Layout from '../Dashboard/Layout/Layout';
import GoBack from '../../global/GoBack';
import { useLocation } from 'react-router-dom';

const ViewImg = () => {
	const location = useLocation();
	const { image } = location.state;

	return (
		<Layout>
			<div className='h-[60vh] md:h-auto flex items-center justify-center'>
				<div className='w-11/12  p-4 mx-auto border rounded-md md:w-6/12 '>
					<h1 className='my-4 text-center'>Your Documents</h1>

					<div className=''>
						<img src={image} alt='image1' className=' w-60 mx-auto ' />
					</div>
					<div className='flex items-center justify-center mt-9 '>
						<GoBack />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ViewImg;
