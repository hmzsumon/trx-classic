import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';

const GoBack = () => {
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};
	return (
		<div>
			<button
				className='flex items-center text-xs text-blue-600 hover:underline hover:text-blue-700 '
				onClick={goBack}
			>
				<span>
					<BsArrowLeftShort className='text-xl ' />
				</span>
				<span>Go Back</span>
			</button>
		</div>
	);
};

export default GoBack;
