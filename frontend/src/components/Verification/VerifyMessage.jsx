import React from 'react';
import Layout from '../Dashboard/Layout/Layout';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyMessage = () => {
	const location = useLocation();
	const { status } = location.state;
	const navigate = useNavigate();
	const goBack = () => {
		navigate('/dashboard');
	};

	return (
		<Layout>
			<div className='h-[60vh] md:h-auto flex items-center justify-center'>
				<div className='w-11/12 p-4 mx-auto border rounded-md md:w-6/12 '>
					<h1 className='my-4 text-center'>Verification Status</h1>

					<div className=''>
						{status === 'pending' ? (
							<h2 className=' text-yellow-500 text-sm italic font-semibold text-center'>
								Your uploaded document is in review. You will be notified by
								email within the next 24 hours.
							</h2>
						) : (
							<h2 className=' text-green-500 text-xl italic font-semibold text-center'>
								Your Account Fully Verified
							</h2>
						)}
					</div>
					<div className='flex items-center justify-center mt-10 '>
						<button
							className='flex items-center text-xs text-blue-600 hover:underline hover:text-blue-700 '
							onClick={goBack}
						>
							<span>
								<BsArrowLeftShort className='text-xl ' />
							</span>
							<span>Go Back</span>
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default VerifyMessage;
