import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Dashboard/Layout/Layout';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { useGetPricesQuery } from '../../features/prices/priceApi';

const PXCUsdxView = () => {
	const { data } = useGetPricesQuery();
	const { currentPrice, prices } = data || {};
	let pricesArray = prices ? prices.map((price) => price.price) : [];
	const lowPrice = pricesArray.reduce((a, b) => Math.min(a, b), 100);
	const highPrice = pricesArray.reduce((a, b) => Math.max(a, b), 0);
	let newPrice = currentPrice && currentPrice.price ? currentPrice.price : 0;
	return (
		<Layout>
			<div className=''>
				<div className='w-11/12 h-[60%] mx-auto p-2 md:w-1/2 rounded bg-slate-800 mt-10'>
					<div className='flex flex-col items-center justify-center  space-y-5 '>
						{/* Price List */}
						<div className='flex text-xs flex-wrap items-center justify-center mt-10 mb-4 space-x-4  font-semibold text-center'>
							<p className='text-white'>Current Price = {newPrice}$</p>
							<p className='text-red-500'>
								Low Price = <span className='text-red-500'>{lowPrice}$</span>
							</p>
							<p className='text-green-500'>
								High Price ={' '}
								<span className='text-green-500'>{highPrice}$</span>
							</p>
						</div>
						{/* chart */}
						<div className='w-full'>
							<PxcUsdxChart prices={prices} />
						</div>

						<div className='flex-end'>
							<Link
								to='/dashboard'
								className='flex space-x-1 text-xs italic items-center text-green-500 '
							>
								<span>
									<BsArrowLeftSquare className='text-xs text-green-500' />
								</span>
								<span>Go Back</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PXCUsdxView;
