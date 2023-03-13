import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateMiningMutation } from '../../features/mining/miningApi';
import ButtonLoader from '../../global/ButtonLoader';
import { useNavigate } from 'react-router-dom';

const CreateMining = () => {
	const navigate = useNavigate();
	const [createMining, { isLoading, isError, isSuccess, error }] =
		useCreateMiningMutation();
	const { user } = useSelector((state) => state.auth);

	const handleCreate = () => {
		if (user?.mining_id) {
			alert.show('You already have a mining');
			return;
		}
		createMining();
	};
	useEffect(() => {
		if (error) {
			toast.error(error.data.message);
			if (error.data.message === 'Insufficient balance') {
				navigate('/buy-PXC');
			}
		}
		if (isSuccess) {
			toast.success('Mining created successfully');
		}
	}, [isSuccess, isError, error, navigate]);
	return (
		<div>
			<div className='flex items-center justify-between px-4 py-2 mx-2 my-4'>
				{!user?.mining_id && (
					<div className='mx-auto'>
						{isLoading ? (
							<ButtonLoader />
						) : (
							<button
								className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								onClick={handleCreate}
							>
								Create a Mining Id
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateMining;
