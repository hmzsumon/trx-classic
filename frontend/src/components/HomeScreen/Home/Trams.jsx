import React from 'react';
import Layout from '../../../layouts/Layout';

const Trams = () => {
	return (
		<Layout>
			<div className='h-full py-20 '>
				<div className='px-6 md:px-40'>
					<h1 className='text-[#FF7E00] text-3xl font-semibold'>
						Trams Of Service:
					</h1>
					<p className='p-10 mt-10 text-lg font-semibold leading-9 text-gray-100 border'>
						Please read through these Terms of Service, Acceptable Use Policy
						and our Privacy Policy (collectively as “Agreement”) carefully
						before you (“you”) start using the services. Privacy Policy includes
						our Cookie Policy.
					</p>
					<p className='p-10 mt-10 text-lg font-semibold leading-9 text-gray-100 border'>
						TRX Classic is an online trading service ("Service" or "Services")
						for buying and selling PXC As part of its Services TRX Classic also
						helps resolving disputes if such should arise between buyers and
						sellers. TRX Classic does not become a party to any trade or
						transaction concluded by its users. Users may be natural persons or
						legal entities.
					</p>
					<p className='p-10 mt-10 text-lg font-semibold leading-9 text-gray-100 border'>
						These Terms of Service govern the use of the Services and the
						relationship between the user and TRX Classic Oy, a Finnish limited
						liability company.
					</p>
					<p className='p-10 mt-10 text-lg font-semibold leading-9 text-gray-100 border'>
						If you are a consumer domiciled in the American Economic Area, all
						mandatory statutory consumer protection laws and regulations
						applicable in the country of your residence apply, to the extent
						that those laws and regulations provide a more extensive protection
						than the protection set out in these Terms of Service.
					</p>
					<p className='p-10 mt-10 text-lg font-semibold leading-9 text-gray-100 border'>
						TRX Classic is registered with and operates under the supervision of
						the Financial Supervisory Authority of USA.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default Trams;
