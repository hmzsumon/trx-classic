import React from 'react';
import Layout from '../Dashboard/Layout/Layout';
import { useSelector } from 'react-redux';
import MerchantForm from './MerchantForm';
import MerchantDetails from '../Admin/Merchant/MerchantDetails';
import { useGetMerchantQuery } from '../../features/merchant/merchantApi';
import { FadeLoader } from 'react-spinners';

const Merchant = () => {
	const { user } = useSelector((state) => state.auth);

	const { data, isLoading } = useGetMerchantQuery(user?.merchant_id);
	const { merchant } = data || {};
	return (
		<Layout>
			<div>
				{!user?.is_merchant ? (
					<div>
						{user?.merchant_request ? (
							<div>
								<p className=' text-center mt-20 text-orange-500'>
									You have a pending merchant request. Please waite while admin
									approved your merchant request!
								</p>
							</div>
						) : (
							<MerchantForm />
						)}
					</div>
				) : (
					<div>
						{isLoading ? (
							<div className='flex items-center justify-center w-full h-screen'>
								<FadeLoader color={'#fbbf24'} />
							</div>
						) : (
							<MerchantDetails merchant={merchant} />
						)}
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Merchant;
