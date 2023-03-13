import React, { useState } from 'react';
import Layout from '../Dashboard/Layout/Layout';
import { methods } from '../../utils/methods';
import CopyToClipboardButton from '../../global/CopyToClipboardButton';

const BuyPXC = () => {
	const [amount, setAmount] = useState(0);
	const [sMethod, setSMethod] = useState(methods[0]);
	const [next, setNext] = useState(false);
	const [txid, setTxid] = useState('');

	const subMitHandler = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.append('amount', amount);
		myForm.append('method', sMethod);
		myForm.append('txid', txid);

		for (var pair of myForm.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}
	};
	return (
		<Layout>
			<div className=''>
				<div className='w-11/12 px-2 py-4 mx-auto space-y-4 rounded-md bg-slate-800 md:w-9/12'>
					<div className='text-sm font-bold text-center md:text-2xl'>
						<h1>Buy Payunx Coin</h1>
					</div>
					{/* Next False */}
					{!next && (
						<>
							<div>
								<label className='text-xs font-semibold text-slate-500'>
									Amount
								</label>
								<input
									type='number'
									className='w-full px-3 py-4 mt-2 text-sm font-semibold text-gray-100 bg-transparent border rounded-md focus:outline-none'
									placeholder='Enter amount'
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
							<div>
								<h2>Select a Method</h2>
							</div>
							<div className='grid gap-4'>
								{methods.map((method) => {
									const { id, name, img } = method;
									return (
										<li
											key={id}
											className={`flex items-center justify-between p-2 list-none border rounded-md cursor-pointer ${
												method.id === sMethod.id
													? 'border-yellow-400'
													: 'border-slate-600'
											}`}
											onClick={() => setSMethod(method)}
										>
											<div>
												<img src={img} alt={name} className='w-10' />
											</div>
											<div>
												<h1>{name}</h1>
											</div>
										</li>
									);
								})}
							</div>
							<div>
								<button
									className='w-full px-3 py-4 text-sm font-semibold disabled:cursor-not-allowed text-center text-gray-100 list-none bg-yellow-400 rounded-md cursor-pointer'
									onClick={() => setNext(true)}
									disabled={amount <= 0}
								>
									Next
								</button>
							</div>
						</>
					)}
					{/* Next True */}
					{next && (
						<form onSubmit={subMitHandler}>
							<div className='grid grid-cols-1 gap-6 '>
								<div>
									<h1 className='text-xs text-center '>
										Pay the exact amount of :{' '}
										<span className='text-yellow-400 '>${amount}</span> Transfer
										to the following address
									</h1>
								</div>
								<div className='flex items-center justify-between'>
									<div>
										<li className='p-2 text-sm text-green-500 list-none border rounded'>
											{sMethod.address}
										</li>
									</div>
									<div className=''>
										<CopyToClipboardButton
											text={sMethod.address}
											btnText='Copy'
										/>
									</div>
								</div>
								<div>
									<div className='w-6/12 mx-auto bg-white rounded-md '>
										<p className='text-gray-800 text-center my-2 font-bold'>
											{sMethod.name}{' '}
										</p>
										<img
											src={sMethod.qr}
											alt={sMethod.name}
											className='w-full mx-auto'
										/>
									</div>
								</div>
								<div>
									<h2 className='text-xs text-center'>
										Please Enter Your Transaction ID
									</h2>
									<input
										type='text'
										className='w-full px-3 py-4 mt-2 text-sm font-semibold text-gray-100 bg-transparent border rounded-md focus:outline-none'
										placeholder='Enter Transaction ID'
										value={txid}
										onChange={(e) => setTxid(e.target.value)}
									/>
								</div>
								{/* Submit Button */}
								<div className='grid grid-cols-2 gap-6'>
									<button
										className='w-full px-3 py-4 text-sm font-semibold text-center text-gray-100 list-none bg-green-500 rounded-md cursor-pointer'
										onClick={() => setNext(false)}
									>
										Go Back
									</button>
									<button
										className='w-full px-3 py-4 text-sm font-semibold disabled:cursor-not-allowed text-center text-gray-100 list-none bg-yellow-400 rounded-md cursor-pointer'
										disabled={!txid}
									>
										Submit
									</button>
								</div>
							</div>
						</form>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default BuyPXC;
