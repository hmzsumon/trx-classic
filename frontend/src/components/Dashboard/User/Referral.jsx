import React from 'react';
import { useSelector } from 'react-redux';
import CopyToClipboardButton from '../../../global/CopyToClipboardButton';
import Layout from '../Layout/Layout';

const Referral = () => {
	const { user } = useSelector((state) => state.auth);

	const host = window.location.host;
	const link = `${host}/register?referral_id=${user?._id}`;
	return (
		<Layout>
			<div className='h-screen'>
				<div className='grid w-11/12 grid-cols-1 gap-6 px-2 py-10 mx-auto rounded-md md:grid-cols-2 md:9/12 bg-slate-800'>
					<div>
						<h className='text-xs italic font-semibold text-center md:text-sm'>
							<span>{link}</span>
						</h>
					</div>
					<div className='w-full'>
						<CopyToClipboardButton text={link} btnText='Share' />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Referral;
