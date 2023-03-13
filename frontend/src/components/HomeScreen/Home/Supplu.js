import React from 'react';

const Supply = () => {
	return (
		<div className='h-screen supply' id='supply'>
			<div className='flex flex-col items-center justify-center h-screen space-y-6'>
				<div className=' border-2 px-12 rounded-md flex text-center items-center py-4 border-[#fff]'>
					<h1 className=' text-5xl  text-[#fff] font-bold '>SupplY</h1>
				</div>
				<h1 className='w-full text-4xl px-6 md:text-5xl font-bold leading-[3rem]  md:leading-[4rem] text-center text-[#e49f20] line md:w-9/12'>
					Total Payunx Coin 10000000000
				</h1>
			</div>
		</div>
	);
};

export default Supply;
