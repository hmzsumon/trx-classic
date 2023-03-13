import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Dashboard/Layout/Layout';
import { BsArrowLeftSquare } from 'react-icons/bs';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const Support = () => {
	// +13369157846;
	// t.me / payunxcoin;
	return (
		<Layout>
			<div className='h-screen'>
				<div className='w-11/12 h-[60%] mx-auto p-2 md:w-1/2 rounded bg-slate-800 mt-10'>
					<div className='flex flex-col items-center justify-center h-full space-y-5 '>
						<h1 className='text-2xl font-bold text-gray-100'>
							Our support team is waiting for you
						</h1>
						<div className='grid '>
							<a
								href='https://tawk.to/chat/638f5a2cb0d6371309d2e93b/default'
								target='_blank'
								rel='noreferrer'
								className='flex p-2 space-x-2 font-bold bg-yellow-400 rounded text-slate-800'
							>
								Click To Join Live Chat
							</a>
							<span className='my-2 italic text-center'>or</span>
							<a
								href='https://wa.me/+13369157846'
								target='_blank'
								rel='noreferrer'
								className='flex p-2 space-x-2 font-bold bg-yellow-400 rounded text-slate-800'
							>
								WhatsApp Support
							</a>
						</div>
						<div>
							<Link to='/dashboard' className='flex space-x-2 text-green-500 '>
								<span>
									<BsArrowLeftSquare className='text-2xl text-green-500' />
								</span>
								<span>Go Back</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Support;
