import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Dashboard/Layout/Layout';
import qr from '../../assets/qr/qrcode1.png';
import CopyToClipboardButton from '../../global/CopyToClipboardButton';

const ReceiveUsdx = () => {
	const { usdx } = useSelector((state) => state.usdxDetails);

	return (
		<Layout>
			<div className='w-11/12 px-2 py-4 mx-auto space-y-4 rounded-md bg-slate-800 md:w-9/12'>
				<div>
					<h2 className='text-sm font-extrabold text-center text-gray-100 md:text-3xl'>
						Please Copy Your USDX Address Below
					</h2>
				</div>

				<div>
					<div className='w-9/12 mx-auto bg-white rounded-sm  md:w-6/12'>
						<img src={qr} alt='qr-code' />
					</div>
				</div>

				<div className='space-y-4 '>
					<h3 className='py-1 text-sm text-center bg-transparent border rounded'>
						<span className='font-semibold text-green-500'>
							{usdx?.usdx_id}
						</span>
					</h3>
					<CopyToClipboardButton text={usdx?.usdx_id} btnText='Copy' />
				</div>
			</div>
		</Layout>
	);
};

export default ReceiveUsdx;
