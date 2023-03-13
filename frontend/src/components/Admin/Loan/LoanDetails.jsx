import React from 'react';
import GoBack from '../../../global/GoBack';
import { formatDate } from '../../../utils/functions';

const LoanDetails = ({ loan }) => {
	const {
		amount,
		createdAt,
		status,
		email,
		father_name,
		mother_name,
		name,
		nid,
		occupation,
		phone,
	} = loan;
	const { address_line1, address_line2, city, country, state, zip } =
		loan.present_address;
	const {
		address_line1: p_a_1,
		address_line2: p_a_2,
		city: p_city,
		country: p_country,
		state: p_state,
		zip: p_zip,
	} = loan.permanent_address;
	return (
		<div>
			<div className=''>
				<div className='w-11/12  mx-auto p-2  rounded bg-slate-800 my-4'>
					<div className=''>
						<h1 className='text-sm text-center my-4 space-x-2 font-bold text-gray-100'>
							<span
								className={`capitalize mr-2 ${
									status === 'pending' ? 'text-yellow-500' : 'text-green-500'
								}`}
							>
								{status}
							</span>
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
									<li>{name}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Father Name</span>
										<span>:</span>
									</li>
									<li>{father_name}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Mother Name</span>
										<span>:</span>
									</li>
									<li>{mother_name}</li>
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
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Amount</span>
										<span>:</span>
									</li>
									<li>{amount}$</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Request At</span>
										<span>:</span>
									</li>
									<li>{formatDate(createdAt)}</li>
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

									<li className=' text-[.6rem]'>{address_line1}</li>
								</div>
								{address_line2 && (
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Address Line 2</span>
											<span>:</span>
										</li>
										<li className='text-[.6rem]'>{address_line2}</li>
									</div>
								)}
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>Country</span>
										<span>:</span>
									</li>

									<li>{country}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>State</span>
										<span>:</span>
									</li>

									<li>{state}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>City</span>
										<span>:</span>
									</li>

									<li>{city}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>Zip</span>
										<span>:</span>
									</li>
									<li>{zip}</li>
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

									<li className=' text-[.6rem]'>{p_a_1}</li>
								</div>
								{p_a_2 && (
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Address Line 2</span>
											<span>:</span>
										</li>
										<li className='text-[.6rem]'>{p_a_2}</li>
									</div>
								)}
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>Country</span>
										<span>:</span>
									</li>

									<li>{p_country}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>State</span>
										<span>:</span>
									</li>

									<li>{p_state}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>City</span>
										<span>:</span>
									</li>

									<li>{p_city}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>Zip</span>
										<span>:</span>
									</li>
									<li>{p_zip}</li>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoanDetails;
