import React from 'react';
import img from '../assets/maintaines.gif';

const Maintenance = () => {
	return (
		<div className='mt-20 text-center'>
			<h1 className='text-sm text-white md:text-2xl'>
				Our site is currently being updated, please wait.
			</h1>
			<div className='mt-20'>
				<img src={img} alt='maintenance' className='mx-auto md:w-1/2' />
			</div>
		</div>
	);
};

export default Maintenance;
