import React from 'react';
import { Link } from 'react-router-dom';

const PriceList2 = ({
	title,
	chance,
	lastPrice,
	supply,
	marketCap,
	bgColor,
	link,
}) => {
	return (
		<div className='bg-teal-600 rounded-md'>
			<div className='p-3'>
				<h1 className='my-2 italic font-semibold '> Price History</h1>
				<div className='mx-auto space-y-2 '>
					<div className='grid w-full grid-cols-5 gap-2 text-xs italic'>
						<span className=''>Pair</span>
						<span className='text-center text-[0.6rem] md:text-xs'>
							Starting Price
						</span>
						<span className='text-center text-[0.6rem] md:text-xs'>
							Total Supply
						</span>
						<span className='text-center text-[0.5rem] md:text-xs'>
							Market Cap
						</span>
						<span className='text-center text-[0.6rem] md:text-xs'>Change</span>
					</div>
					<div className='grid w-full grid-cols-5 gap-2 text-xs italic'>
						<span className='text-[0.6rem] text-gray-100'>
							<Link to={link}>{title}</Link>
						</span>
						<span className='text-center text-gray-100 text-[0.6rem] md:text-xs'>
							{lastPrice}
						</span>
						<span className='text-center text-[0.6rem] md:text-xs text-gray-1000'>
							${supply}
						</span>
						<span className=' text-gray-100 text-center text-[0.6rem] md:text-xs'>
							${marketCap}
						</span>
						<span
							className={`px-2 py-[.15rem] mx-auto text-center bg-green-500 rounded ${bgColor}`}
						>
							{chance}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PriceList2;
