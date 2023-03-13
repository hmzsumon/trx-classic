import React from 'react';
import { Button, Snackbar } from '@mui/material';
import { useState } from 'react';

const CopyToClipboardButton = ({ text, btnText }) => {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(true);
		navigator.clipboard.writeText(text);
	};
	return (
		<>
			<Button onClick={handleClick} variant='outlined' sx={{ width: '100%' }}>
				{btnText}
			</Button>
			<Snackbar
				open={open}
				onClose={() => setOpen(false)}
				autoHideDuration={2000}
				message='Link copied to clipboard'
			/>
		</>
	);
};

export default CopyToClipboardButton;
