import React from 'react';
import { FcCurrencyExchange } from 'react-icons/fc';

const Exchange = () => {
	return (
		<div className='exchange pt-[100px]' id='exchange'>
			<div className='flex flex-col items-center justify-center h-screen space-y-6'>
				<FcCurrencyExchange className='w-[300px] h-[300px]' />
				<div className=' border-2 px-12 rounded-md flex text-center items-center py-4 border-[#3F51B5]'>
					<h1 className=' text-5xl  text-[#fff] font-bold '>Exchange</h1>
				</div>
				<h1 className='w-full text-4xl px-6 md:text-5xl font-bold leading-[3rem]  md:leading-[4rem] text-center text-gray-400 line md:w-9/12'>
					Exchange Coming Soon.
				</h1>
			</div>
		</div>
	);
};

export default Exchange;
