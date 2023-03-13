import React, { useEffect } from 'react';
import Layout from '../Dashboard/Layout/Layout';
import GoBack from '../../global/GoBack';

import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNewLoanRequestMutation } from '../../features/loan/loanApi';

const LoanSubmit = () => {
	const [newLoanRequest, { isError, isLoading, isSuccess, error }] =
		useNewLoanRequestMutation();
	const navigate = useNavigate();
	const location = useLocation();
	const { personalInfo, address1, address2 } = location.state;

	const { fatherName, fullName, motherName, phone, email, occupation, nid } =
		personalInfo;
	const {
		addressLine1: presentAddress,
		addressLine2: presentAddress2,
		country: presentCountry,
		state: presentState,
		city: presentCity,
		zip: presentZip,
	} = address1;
	const {
		addressLine1: permanentAddress,
		addressLine2: permanentAddress2,
		country: permanentCountry,
		state: permanentState,
		city: permanentCity,
		zip: permanentZip,
	} = address2;

	// handle submit
	const handleSubmit = () => {
		console.log('submit');
		newLoanRequest({
			personalInfo,
			address1,
			address2,
		});
	};

	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}
		if (isSuccess) {
			toast.success('Loan request submitted successfully');
			navigate('/loan/message', { state: { status: 'pending' } });
		}
	}, [isError, isSuccess, error, navigate]);

	return (
		<Layout>
			<div className=''>
				<div className='w-11/12  mx-auto p-2 md:w-1/2 rounded bg-slate-800 mt-10'>
					<div className=''>
						<h1 className='text-sm text-center my-4 font-bold text-gray-100'>
							Application Details
						</h1>

						<div className='border p-3'>
							<div className=' text-xs space-y-1'>
								<h2 className='text-center text-xs italic text-indigo-600'>
									Personal Information:
								</h2>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Full Name</span>
										<span>:</span>
									</li>
									<li>{fullName}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Father Name</span>
										<span>:</span>
									</li>
									<li>{fatherName}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Mother Name</span>
										<span>:</span>
									</li>
									<li>{motherName}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Phone</span>
										<span>:</span>
									</li>
									<li>{phone}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Email</span>
										<span>:</span>
									</li>
									<li>{email}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Occupation</span>
										<span>:</span>
									</li>
									<li>{occupation}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Nid/Passport</span>
										<span>:</span>
									</li>
									<li>{nid}</li>
								</div>
							</div>

							<hr className='my-2 border-slate-700' />

							<div className='text-xs space-y-1'>
								<h2 className='text-center text-xs italic text-green-500'>
									Present Address:
								</h2>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Address Line 1</span>
										<span>:</span>
									</li>

									<li className=' text-[.6rem]'>{presentAddress}</li>
								</div>
								{presentAddress2 && (
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Address Line 2</span>
											<span>:</span>
										</li>
										<li className='text-[.6rem]'>{presentAddress2}</li>
									</div>
								)}
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>Country</span>
										<span>:</span>
									</li>

									<li>{presentCountry}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>State</span>
										<span>:</span>
									</li>

									<li>{presentState}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>City</span>
										<span>:</span>
									</li>

									<li>{presentCity}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>Zip</span>
										<span>:</span>
									</li>
									<li>{presentZip}</li>
								</div>
							</div>

							<hr className='my-2 border-slate-700' />

							<div className='text-xs space-y-1'>
								<h2 className='text-center text-xs italic text-orange-500'>
									Permanent Address:
								</h2>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Address Line 1</span>
										<span>:</span>
									</li>

									<li className=' text-[.6rem]'>{permanentAddress}</li>
								</div>
								{presentAddress2 && (
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Address Line 2</span>
											<span>:</span>
										</li>
										<li className='text-[.6rem]'>{permanentAddress2}</li>
									</div>
								)}
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>Country</span>
										<span>:</span>
									</li>

									<li>{permanentCountry}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>State</span>
										<span>:</span>
									</li>

									<li>{permanentState}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>City</span>
										<span>:</span>
									</li>

									<li>{permanentCity}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>Zip</span>
										<span>:</span>
									</li>
									<li>{permanentZip}</li>
								</div>
							</div>
						</div>
						<button
							className='w-full py-2 mt-4 text-sm font-bold text-white uppercase bg-blue-500 rounded focus:outline-none hover:bg-blue-600 hover:shadow-none'
							onClick={handleSubmit}
						>
							Submit
						</button>

						<div className='flex items-center justify-center mt-10 '>
							<GoBack />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default LoanSubmit;
