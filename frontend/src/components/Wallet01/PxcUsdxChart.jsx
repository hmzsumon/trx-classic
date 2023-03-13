/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const PxcUsdxChart = ({ prices }) => {
	let dates = prices ? prices.map((price) => price.createdAt) : [];
	let pricesArray = prices ? prices.map((price) => price.price) : [];

	const [mySeries, setMySeries] = React.useState([]);
	const [myOptions, setMyOptions] = React.useState([]);
	const series = [
		{
			name: 'series1',
			data: mySeries,
		},

		// {
		// 	name: 'series2',
		// 	data: [10, 20, 30, 40, 50, 60, 70],
		// },
	];

	useEffect(() => {
		setMySeries(pricesArray);
		setMyOptions(dates);
	}, [prices]);

	const options = {
		chart: {
			height: 100,
			type: 'area',
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
		},
		yaxis: {
			labels: {
				0.0: {
					formatter: function (val) {
						return val + '%';
					},
				},
			},
			title: {
				text: 'Price',
			},
		},

		xaxis: {
			type: 'datetime',
			categories: myOptions,
		},
	};

	return (
		<div>
			<ReactApexChart
				options={options}
				series={series}
				type='area'
				height={200}
				width={'100%'}
			/>
		</div>
	);
};

export default PxcUsdxChart;
