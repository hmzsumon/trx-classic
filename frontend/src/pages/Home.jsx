import React from 'react';
import BannerNew from '../components/HomeScreen/Home/BannerNew';
import Overview from '../components/HomeScreen/Home/Overview';
import Started from '../components/HomeScreen/Home/Started';
import Layout from '../layouts/Layout';

import Carousel from '../components/Banner/Carousel';
import CoinsTable from '../components/HomeScreen/Home/CoinsTable';

const Home = () => {
	return (
		<Layout>
			<div className='banner-wrapper'>
				<BannerNew />
				<Carousel />
			</div>
			<CoinsTable />
			{/* <Overview /> */}
			<Started />
		</Layout>
	);
};

export default Home;
