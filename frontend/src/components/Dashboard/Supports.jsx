import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import CopyIcon from '../../global/CopyIcon';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const Supports = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className='grid grid-cols-2 gap-10'>
				<button className='w-full px-3 py-2 italic font-bold text-center text-gray-100 bg-[#3390EC] rounded-sm'>
					<a
						href='https://t.me/trxclassicearn'
						target='_blank'
						rel='noreferrer'
					>
						Join Telegram
					</a>
				</button>

				<button className='w-full px-3 py-2 italic font-bold text-center text-gray-100 bg-[#25D366] rounded-sm'>
					<a
						href='https://wa.me/qr/GFHZIL5YLTOYG1'
						target='_blank'
						rel='noreferrer'
					>
						Connect WhatsApp
					</a>
				</button>
			</div>
			{/* Dialog Start */}
			<div>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-describedby='alert-dialog-slide-description'
				>
					<DialogTitle>
						<div className='flex space-x-2'>
							<span className='text-xs md:text-sm'>
								{'0x69639dbbcf17f97c369970c9cf929000951a0c0c'}
							</span>
							<span>
								<CopyIcon text={'0x69639dbbcf17f97c369970c9cf929000951a0c0c'} />
							</span>
						</div>
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-slide-description'>
							Download Metamask or Trust wallet and connect "TRXC" wallet via
							BNB Chain with this contract ID.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} sx={{ color: 'red' }}>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			{/* Dialog End */}
		</>
	);
};

export default Supports;
