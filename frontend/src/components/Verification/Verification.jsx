/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Layout from '../Dashboard/Layout/Layout';

import GoBack from '../../global/GoBack';
import { useSelector } from 'react-redux';

const options = [
	{ id: 1, title: 'Driving License', type: 'Driving License' },
	{ id: 2, title: 'ID Card', type: 'National ID' },
	{ id: 3, title: 'Passport', type: 'Passport' },
];

const Verification = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (user.is_verify_request || user.is_identity_verified) {
			navigate('/verify/message', {
				state: {
					status: user.is_verify_request ? 'pending' : 'verified',
				},
			});
		}
	}, [user.is_verify_request, navigate, user.is_identity_verified]);

	return (
		<Layout>
			<div className=''>
				<div className='w-11/12 h-[60%] mx-auto p-2 md:w-1/2 rounded bg-slate-800 mt-10'>
					<div className='flex flex-col items-center justify-center space-y-5 '>
						<h1 className='text-2xl font-bold text-gray-100'>Verification</h1>
						<div className='space-y-3'>
							<p className='text-xs italic'>
								Before you can Withdraw, we need to verify your identity.
							</p>
							<p className='text-xs italic'>
								Upload a copy of your identity document by selecting one of the
								options below.
							</p>
						</div>
						<div className='flex flex-col w-full gap-4'>
							{options.map((option) => (
								<NavLink
									key={option.id}
									to='/verification/document-1'
									state={{ method: option.type }}
									className='w-full py-3 text-center text-white bg-green-400'
								>
									<span>{option.title}</span>
								</NavLink>
							))}
						</div>
					</div>

					<div className='flex items-center justify-center mt-10 '>
						<GoBack />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Verification;
