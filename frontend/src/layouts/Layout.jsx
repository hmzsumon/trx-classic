import React from 'react';
import Footer from './Footer/Footer';
import Navbar from './Header/Navbar';

const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<div className='pt-[90px]'>{children}</div>
			<div className='self-end '>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
