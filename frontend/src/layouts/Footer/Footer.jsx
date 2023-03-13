/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='space-y-8 bg-gradient-to-r pt-14'>
			<div className='flex items-center '>
				<NavLink to='/' className='flex items-center mx-auto '>
					<img src='/images/trx1.png' alt='logo' className='w-14' />
					<h1 className='text-2xl italic font-bold text-white md:text-3xl'>
						TRX Classic
					</h1>
				</NavLink>
			</div>

			<div className=''>
				<div className='col-span-5 md:col-span-3 '>
					<div className='grid grid-cols-2 mx-auto space-y-4 md:grid-cols-4'>
						<div className='flex flex-col items-center justify-center '>
							<div>
								<p className='my-2 text-lg text-white'>Company:</p>
								<ul className='text-gray-400'>
									<li>
										<Link to='/about'>About</Link>
									</li>
									<li>
										<Link to='/support'>Support </Link>
									</li>
									<li>
										<Link to='/privacy'>Privacy Policy </Link>
									</li>

									<li>
										<Link to='/trams'>Trams Of Service</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className='flex flex-col items-center justify-center '>
							<div>
								<p className='my-2 text-lg text-white'>Participate:</p>
								<ul className='text-gray-400'>
									<li>
										<Link to='/buy-PXC'>Buy PXC</Link>
									</li>
									<li>
										<Link to='/mining'>Mining</Link>
									</li>
									<li>
										<Link to='/'>Withdraw</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className='flex flex-col items-center justify-center '>
							<div>
								<p className='my-2 text-lg text-white'>Exchange:</p>
								<ul className='text-gray-400'>
									<li>
										<Link to='/home/exchange'>All Exchange</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className='flex flex-col items-center justify-center '>
							<div>
								<p className='my-2 text-lg text-white'>FAQ:</p>
								<ul className='text-gray-400'>
									<li>
										<Link to='/faq'>All FAQ's</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='bg-[#090C14] w-full h-12 flex items-center justify-center'>
				<p className='text-center text-white'>
					Copyright © 2022-2023 TRX Classic All Rights Reserved
				</p>
			</div>
		</footer>
	);
};

export default Footer;
