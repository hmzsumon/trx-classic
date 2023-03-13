import React from 'react';
import { formatDate } from '../../../utils/functions';
import { Link } from 'react-router-dom';

const VerificationDetails = ({ verification }) => {
	return (
		<div className='my-4 text-xs'>
			<div className='px-3 py-2 space-y-1 border'>
				<div className='grid grid-cols-2'>
					<p>Name:</p>
					<p>{verification?.name}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Email:</p>
					<p>{verification?.email}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Status:</p>
					<p
						className={`${
							verification.status === 'approved' && 'text-green-500'
						} ${verification.status === 'pending' && 'text-red-500'} ${
							verification.status === 'rejected' && 'text-orange-500'
						}`}
					>
						{verification?.status}
					</p>
				</div>
				{/* verification Date */}
				<div className='grid grid-cols-2'>
					<p>Date:</p>
					<p>{formatDate(verification?.createdAt)}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Method:</p>
					<p>{verification?.method}</p>
				</div>
				<div className='grid grid-cols-3 gap-4 mt-10 md:w-1/2'>
					<Link
						to='/view-image'
						state={{ image: verification?.document_1.url }}
					>
						<img
							src={verification?.document_1.url}
							alt=''
							className='md:w-40'
						/>
					</Link>
					<Link
						to='/view-image'
						state={{ image: verification?.document_2.url }}
					>
						<img
							src={verification?.document_2.url}
							alt=''
							className='md:w-40'
						/>
					</Link>
					<Link to='/view-image' state={{ image: verification?.avatar.url }}>
						<img src={verification?.avatar.url} alt='' className='md:w-40' />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default VerificationDetails;
