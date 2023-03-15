import React, { useEffect, useState } from 'react';

const Countdown = ({ profit }) => {
	const [stateProfit, setStateProfit] = useState(profit);
	let interval;

	const startTimer = () => {
		interval = setInterval(() => {
			setStateProfit((prevState) => prevState + 0.00011574);
		}, 1000);
	};

	// componentDidMount
	useEffect(() => {
		if (profit) {
			startTimer();
		}
		return () => {
			clearInterval(interval);
		};
	});

	return (
		<>
			<h1 className='text-xl italic font-bold text-gray-100 '>
				{stateProfit ? stateProfit.toFixed(8) : Number(0).toFixed(8)}$
			</h1>
		</>
	);
};

export default Countdown;
