import React from 'react';
import { Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

const CopyIcon = ({ text, btnText }) => {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(true);
		navigator.clipboard.writeText(text);
	};
	return (
		<>
			<AiOutlineCopy
				onClick={handleClick}
				variant='outlined'
				className='text-2xl text-yellow-600 cursor-pointer'
			/>

			<Snackbar
				open={open}
				onClose={() => setOpen(false)}
				autoHideDuration={2000}
				message='copied to clipboard'
			/>
		</>
	);
};

export default CopyIcon;
