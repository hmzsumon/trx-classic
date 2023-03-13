import React from 'react';
import Icon1 from '../../assets/icon/bet365_7_id_f.png';
import Icon2 from '../../assets/icon/bet365_8_id_b.png';

const Passport = () => {
	return (
		<div>
			<div>
				<img src={Icon1} alt='Icon' className='py-2 mx-auto rounded w-44' />
			</div>
			<h1 className='my-2 text-xl text-center'>
				Upload your Passport 1st page
			</h1>
			<p className='text-xs italic text-center'>Step 1 of 2</p>
			<p className='text-center'>
				Upload a color image of the entire document. Screenshots are not
				allowed. JPEG, JPG or PNG format only
			</p>
			<button
				className='w-full py-2 my-2 text-white bg-green-400'
				onClick={() => console.log()}
			>
				Choose file
			</button>
		</div>
	);
};

export default Passport;
