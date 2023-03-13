import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import bitImg from '../../assets/mining/bit.png';

import { useStartMiningMutation } from '../../features/mining/miningApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../Dashboard/Layout/Layout';
import MiningLayout from './MiningLayout';
import CircledSpinning from '../../global/CircledSpinning';

const packages = [
	{
		id: 1,
		name: 'Bronze',
		price: '100',
		spinning: <CircledSpinning />,
		color: '#C77B30',
	},
	{
		id: 2,
		name: 'Silver',
		price: '500',
		spinning: <CircledSpinning />,
		color: '#C7C7C7',
	},
	{
		id: 3,
		name: 'Gold',
		price: '1000',
		spinning: <CircledSpinning />,
		color: '#C7C7C7',
	},
	{
		id: 4,
		name: 'Diamond',
		price: '5000',
		spinning: <CircledSpinning />,
		color: '#C7C7C7',
	},
	{
		id: 5,
		name: 'Loan',
		price: '1000',
		spinning: <CircledSpinning />,
		color: '#C7C7C7',
	},
	{
		id: 6,
		name: 'Platinum',
		price: '10000',
		spinning: <CircledSpinning />,
		color: '#C7C7C7',
	},
];

const wallets = [
	{ id: 1, name: 'TRXC Balance', value: 'payunx' },
	{ id: 2, name: 'Loan Balance', value: 'loan' },
];

const Investment = () => {
	const navigate = useNavigate();
	const [startMining, { isError, isLoading, isSuccess, error }] =
		useStartMiningMutation();
	const { user } = useSelector((state) => state.auth);
	const { mining } = useSelector((state) => state.mining);

	const [iPackage, setIPackage] = useState(null);
	const [wallet, setWallet] = useState(null);

	const handleSubmit = (e, invest) => {
		e.preventDefault();
		if (invest > user.balance) {
			alert.show('You need to have at least $' + invest + ' to invest');
			return;
		}
		const myForm = new FormData();
		myForm.append('package', iPackage?.price);
		myForm.append('wallet', wallet?.value);
		startMining(myForm);
	};

	useEffect(() => {
		// check if user has all ready mining
		if (mining.mining_status === 'active') {
			console.log('mining is start');
			return navigate('/mining');
		}
		if (isError) {
			toast.error(error.data.message);
		}
		if (isSuccess) {
			toast.success('Mining started successfully');
			navigate('/mining');
		}
	}, [isError, isSuccess, error, navigate, mining.mining_status]);

	return (
		<Layout>
			<MiningLayout>
				<div className='md:mt-20 md:w-[50%] mx-auto '>
					<div className=''>
						<img src={bitImg} alt='BIT' className='w-20 mx-auto mt-4' />
					</div>
				</div>
				<div className='mx-4 my-6 shadow-lg md:w-9/12 md:mx-auto'>
					<form className='p-6 border rounded-md' onSubmit={handleSubmit}>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-5 '>
							{packages.map((item) => (
								<li
									key={item.id}
									className={`flex text-sm items-center justify-around flex-shrink-0 w-full px-2 py-4 space-x-4  text-white bg-green-500 border-4 border-transparent rounded md:w-auto hover:text-teal-800 disabled:bg-red-300 disabled:text-gray-700 disabled:cursor-not-allowed cursor-pointer ${
										iPackage?.id === item.id ? 'bg-teal-800' : ''
									}`}
									disabled={mining.mining_status === 'inactive'}
									onClick={() => setIPackage(item)}
								>
									<span>{item.name}</span>
									<span>{item.price}$</span>
								</li>
							))}
						</div>
						<div className='my-6 space-y-4'>
							<h2>Please Choice a Wallet</h2>
							<div className='grid grid-cols-1 space-y-2 '>
								{wallets.map((item) => {
									return (
										<li
											key={item.id}
											className={`list-none border border-yellow-400 flex items-center justify-center rounded-md p-2 cursor-pointer hover:bg-yellow-400 hover:text-white ${
												wallet?.id === item.id ? 'bg-yellow-400 text-white' : ''
											}`}
											onClick={() => setWallet(item)}
										>
											<span>{item.name} </span>
										</li>
									);
								})}
							</div>
						</div>
						<div>
							<button
								className='px-4 py-2 ml-auto font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent disabled:cursor-not-allowed'
								disabled={!iPackage || !wallet}
							>
								{isLoading ? <CircledSpinning /> : 'Submit Investment'}
							</button>
						</div>
					</form>
				</div>
			</MiningLayout>
		</Layout>
	);
};

export default Investment;
