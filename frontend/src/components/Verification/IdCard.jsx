import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Icon1 from '../../assets/icon/bet365_7_id_f.png';
import Icon2 from '../../assets/icon/bet365_8_id_b.png';

const IdCard = () => {
	return (
		<div>
			<div>
				<img src={Icon1} alt='Icon' className='py-2 mx-auto rounded w-44' />
			</div>
			<h1 className='my-2 text-xl text-center'>
				Upload front of identity card
			</h1>
			<p className='text-xs italic text-center'>Step 1 of 2</p>
			<p className='my-2 text-xs text-center'>
				Upload a color image of the entire document. Screenshots are not
				allowed. JPEG, JPG or PNG format only
			</p>

			<div className='upload'>
				<button type='button' className='btn-warning'>
					<AiOutlineCloudUpload /> Upload File
					<input type='file' />
				</button>
			</div>
		</div>
	);
};

export default IdCard;
