import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Dashboard/Layout/Layout';
import { BsArrowLeftSquare } from 'react-icons/bs';
import Img5 from '../../assets/banner/banner5.jpg';
import Img6 from '../../assets/banner/banner6.jpg';
import Img7 from '../../assets/banner/banner7.jpg';
import Img8 from '../../assets/banner/banner8.jpg';

const images = [Img5, Img6, Img7, Img8];
const Offer = () => {
	return (
		<Layout>
			<div className='h-screen'>
				<div className='w-11/12 h-[60%] mx-auto p-2 md:w-1/2 rounded bg-slate-800 mt-10'>
					<div className='flex flex-col items-center justify-center h-full space-y-5 '>
						<div className='grid grid-cols-2 gap-4 '>
							{images.map((img, index) => (
								<img
									src={img}
									alt=''
									key={index}
									className='object-cover w-full h-full'
								/>
							))}
						</div>
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

export default Offer;
