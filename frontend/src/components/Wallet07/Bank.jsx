import React from 'react';
import { useCreateWithdrawMutation } from '../../features/withdraw/withdrawApi';
import Layout from '../Dashboard/Layout/Layout';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const Bank = () => {
	const navigate = useNavigate();
	const [createWithdraw, { isLoading, isSuccess, isError, error }] =
		useCreateWithdrawMutation();
	const [bankName, setBankName] = React.useState('');
	const [accountName, setAccountName] = React.useState('');
	const [branchName, setBranchName] = React.useState('');
	const [swiftCode, setSwiftCode] = React.useState('');
	const [accountNumber, setAccountNumber] = React.useState('');
	const [amount, setAmount] = React.useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.append('method', 'bank');
		myForm.append('bank_name', bankName);
		myForm.append('account_name', accountName);
		myForm.append('branch_name', branchName);
		myForm.append('swift_code', swiftCode);
		myForm.append('account_number', accountNumber);
		myForm.append('amount', amount);

		createWithdraw(myForm);
	};

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Withdrawal request sent successfully');
			navigate('/user/withdraws');
		}
		if (isError) {
			toast.error(error.data.message);
			if (error.data.message === 'You have pending withdraw request') {
				navigate('/user/withdraws');
			}
		}
	}, [isSuccess, isError, error, navigate]);

	return (
		<Layout>
			<div className='h-screen'>
				<div className='px-4 py-2 mx-auto rounded md:w-7/12 bg-slate-800'>
					<h1 className='text-center'>Bank Transfer</h1>
					<h5 className='flex flex-col text-xs text-center text-gray-400'>
						Min Withdraw: 200$ & Max Withdraw: 20,000$
						<span className='mt-2 text-xs italic font-bold text-center text-green-400'>
							Withdraw Fee 15.00$
						</span>
					</h5>
					<div>
						<form className='flex flex-col space-y-2' onSubmit={handleSubmit}>
							<div className='flex flex-col'>
								<label htmlFor='bankName'>Bank Name</label>
								<input
									type='text'
									name='bankName'
									id='bankName'
									value={bankName}
									onChange={(e) => setBankName(e.target.value)}
									className='px-2 py-1 bg-transparent border-2 border-yellow-500 rounded'
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='branchName'>Branch Name</label>
								<input
									type='text'
									name='branchName'
									id='branchName'
									value={branchName}
									onChange={(e) => setBranchName(e.target.value)}
									className='px-2 py-1 bg-transparent border-2 border-yellow-500 rounded'
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='swiftCode'>Swift Code</label>
								<input
									type='text'
									name='swiftCode'
									id='swiftCode'
									value={swiftCode}
									onChange={(e) => setSwiftCode(e.target.value)}
									className='px-2 py-1 bg-transparent border-2 border-yellow-500 rounded'
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='accountName'>Account Name</label>
								<input
									type='text'
									name='accountName'
									id='accountName'
									value={accountName}
									onChange={(e) => setAccountName(e.target.value)}
									className='px-2 py-1 bg-transparent border-2 border-yellow-500 rounded'
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='accountNumber'>Account Number</label>
								<input
									type='text'
									name='accountNumber'
									id='accountNumber'
									value={accountNumber}
									onChange={(e) => setAccountNumber(e.target.value)}
									className='px-2 py-1 bg-transparent border-2 border-yellow-500 rounded'
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='amount'>Amount</label>
								<input
									type='text'
									name='amount'
									id='amount'
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									className='px-2 py-1 bg-transparent border-2 border-yellow-500 rounded'
								/>
							</div>

							<button
								className='px-2 py-1 my-3 text-white bg-green-500 rounded disabled:cursor-not-allowed '
								disabled={
									!bankName ||
									!branchName ||
									!swiftCode ||
									!accountName ||
									!accountNumber ||
									!amount ||
									amount < 200 ||
									amount > 20000
								}
							>
								{isLoading ? <FadeLoader color='#fff' size={10} /> : 'Submit'}
							</button>
							<small className='italic font-bold text-center text-yellow-500'>
								Process Time: Up to 2 Working Day's
							</small>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Bank;
