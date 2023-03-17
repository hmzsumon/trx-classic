import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import ButtonLoaderCircle from '../../../global/ButtonLoaderCircle';

import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateNoticeMutation } from '../../../features/notice/noticeApi';

const CreateNotice = () => {
	const location = useLocation();
	const { activeNotice } = location.state || {};
	const navigate = useNavigate();
	const [createNotice, { isError, isLoading, error, isSuccess }] =
		useCreateNoticeMutation();
	const [notice, setNotice] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (notice === '') {
			toast.error('Amount cannot be 0');
			return;
		}
		const myForm = new FormData();
		myForm.append('notice', notice);
		createNotice(myForm);
	};

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('Price created successfully');
			navigate('/admin/notice');
		}
	}, [isError, isSuccess, error, navigate]);

	return (
		<DashboardLayout>
			<div className='w-11/12 px-2 py-4 mx-auto space-y-4 rounded-md bg-slate-800 md:w-9/12'>
				<div>
					<h2 className='text-xl font-extrabold text-center text-gray-100 md:text-3xl'>
						Create New Notice
					</h2>
				</div>

				<h3 className='py-1 px-2 bg-transparent border rounded-md'>
					<span className='font-semibold text-orange-500 text-xs'>
						Current Notice:{' '}
						<span className=' text-gray-300'>{activeNotice?.description}</span>
					</span>
				</h3>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<input type='hidden' name='remember' defaultValue='true' />
					<div className='space-y-4 rounded-md shadow-sm '>
						<div>
							<label htmlFor='password' className='sr-only'>
								Amount
							</label>
							<textarea
								id='textarea'
								name='textarea'
								type='text'
								required
								className='relative block w-full px-3 py-2 mb-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none bg-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								value={notice}
								onChange={(e) => setNotice(e.target.value)}
								placeholder='Please enter notice'
							/>
						</div>
					</div>

					<div>
						{isLoading ? (
							<ButtonLoaderCircle />
						) : (
							<button
								type='submit'
								className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-gray-700 disabled:cursor-not-allowed '
								disabled={isLoading || notice === ''}
							>
								<span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
								Create Notice
							</button>
						)}
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
};

export default CreateNotice;
