import React from 'react';

const ButtonLoaderCircle = () => {
	return (
		<div>
			<div className='flex items-center justify-center py-1 space-x-4 bg-orange-600 rounded'>
				<div className='border-4 border-white border-dashed rounded-full w-7 h-7 spin-slow animate-spin-slow'></div>
				<button className='font-medium text-white' disabled>
					Processing ...
				</button>
			</div>
		</div>
	);
};

export default ButtonLoaderCircle;
