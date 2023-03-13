import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';

import axios from 'axios';

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {
	const [coins, setCoins] = useState([]);

	const url =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

	useEffect(() => {
		axios
			.get(url)
			.then((response) => {
				setCoins(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const items = coins.map((coin) => {
		let profit = coin?.price_change_percentage_24h >= 0;

		return (
			<li className='flex flex-col items-center text-white list-none cursor-pointer'>
				<img src={coin?.image} alt={coin.name} className='w-24 h-24 mb-4' />
				<span>
					{coin?.symbol}
					&nbsp;
					<span
						style={{
							color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
							fontWeight: 500,
						}}
					>
						{profit && '+'}
						{coin?.price_change_percentage_24h?.toFixed(2)}%
					</span>
				</span>
				<span style={{ fontSize: 22, fontWeight: 500 }}>
					$ {numberWithCommas(coin?.current_price.toFixed(2))}
				</span>
			</li>
		);
	});

	const responsive = {
		0: {
			items: 2,
		},
		512: {
			items: 4,
		},
	};

	return (
		<div className='flex items-center py-6 h-1/2'>
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
