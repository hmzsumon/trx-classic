import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Dashboard/Layout/Layout';
import { BsArrowLeftSquare } from 'react-icons/bs';
import AppIcon from '../../assets/logo/google.png';

const AppLink = () => {
	return (
		<Layout>
			<div className='h-screen'>
				<div className='w-11/12 h-[60%] mx-auto p-2 md:w-1/2 rounded bg-slate-800 mt-10'>
					<div className='flex flex-col items-center justify-center h-full space-y-5 '>
						<div>
							<a
								className='flex px-4 py-2 space-x-2 font-bold border-2 border-blue-700 rounded'
								href='https://play.google.com/store/apps/details?id=com.app.PXCpro'
								target='_blank'
								rel='noreferrer'
							>
								<img src={AppIcon} alt='app icon' className='w-32' />
							</a>
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

export default AppLink;
