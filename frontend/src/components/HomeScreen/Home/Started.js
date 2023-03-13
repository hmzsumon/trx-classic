import React from 'react';
import { BiTransferAlt } from 'react-icons/bi';
import { FcCurrencyExchange, FcLowBattery } from 'react-icons/fc';
import { MdOutlinePayment, MdSendToMobile } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/new-pxc.png';

const Started = () => {
	return (
		<div className='pb-20 '>
			<div className='py-[100px] px-[60px]'>
				<h1 className='text-3xl font-semibold text-center text-white'>
					Get Start with TRX Classic.
				</h1>
				<div className='items-center justify-around grid-cols-2 mt-20 md:grid'>
					<div className='my-10 md:mt-0 md:hidden'>
						<img
							src='./images/get-str-icon.png'
							alt='n'
							className='mx-auto w-80'
						/>
					</div>
					<div className='space-y-6'>
						<p className='text-lg font-semibold'>
							TRX Classic User Wallet-to-Wallet technology to operate with no
							central authority or banks; managing transactions and the issuing
							of TRX Classic. is carried out collectively by the network. TRX
							Classic. is open-source; its design is public, nobody owns or
							controls TRX Classic. and everyone can take part. Through many of
							its unique properties, TRX Classic allows exciting uses that could
							not be covered by any previous payment system.
						</p>
						<div className='space-y-4 list-none'>
							<li className='flex items-center space-x-4'>
								<BiTransferAlt className='text-2xl text-green-500' />
								<p className='text-lg font-semibold text-white'>
									Wallet To Wallet Transfer
								</p>
							</li>
							<li className='flex items-center space-x-4'>
								<MdOutlinePayment className='text-2xl text-[#FF7E00] ' />
								<p className='text-lg font-semibold text-white'>
									International Merchant Payment
								</p>
							</li>

							<li className='flex items-center space-x-4'>
								<FcLowBattery className='text-2xl ' />
								<p className='text-lg font-semibold text-white'>
									Low Fees (0.50%)
								</p>
							</li>

							<li className='flex items-center space-x-4'>
								<FcCurrencyExchange className='text-2xl ' />
								<p className='text-lg font-semibold text-white'>
									Digital Currency
								</p>
							</li>

							<li className='flex items-center space-x-4'>
								<MdSendToMobile className='text-2xl text-[#FF7E00]  ' />
								<p className='text-lg font-semibold text-white'>
									Instant Send Money
								</p>
							</li>
						</div>
					</div>
					<div className='hidden mt-10 md:mt-0 md:block'>
						<img src='/images/trx1.png' alt='n' className='mx-auto w-80' />
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<button className='px-8 py-4 mx-auto text-xl font-medium text-white bg-gray-900'>
					<Link to='/register' className='text-white'>
						Get Start with TRX Classic.
					</Link>
				</button>
			</div>
		</div>
	);
};

export default Started;
