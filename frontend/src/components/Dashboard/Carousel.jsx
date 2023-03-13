import React from 'react';
import AliceCarousel from 'react-alice-carousel';

import Img1 from '../../assets/banner/banner12.jpg';
import Img2 from '../../assets/banner/banner13.jpg';
import Img3 from '../../assets/banner/banner14.jpg';

const images = [Img1, Img2, Img3];

const Carousel = () => {
	const items = images.map((img) => {
		return (
			<li className='flex flex-col items-center text-white list-none cursor-pointer'>
				<img src={img} alt='' className=' w-[20rem]' />
			</li>
		);
	});

	const responsive = {
		0: {
			items: 1,
		},
		512: {
			items: 3,
		},
	};

	return (
		<div className='flex items-center px-1 py-4 rounded-md bg-slate-800'>
			<AliceCarousel
				mouseTracking
				infinite
				autoPlayInterval={1000}
				animationDuration={1500}
				disableDotsControls
				disableButtonsControls
				responsive={responsive}
				items={items}
				autoPlay
			/>
		</div>
	);
};

export default Carousel;
