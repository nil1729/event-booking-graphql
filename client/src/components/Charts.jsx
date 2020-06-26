import React, { useContext, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import EventContext from '../context/EventContext.js';

const Charts = () => {
	const eventContext = useContext(EventContext);
	const { Bookings } = eventContext;
	const [data, setData] = useState([0, 0, 0]);
	useEffect(() => {
		let prices = Bookings.map(item => item.event.price);
		let priceBucket = {
			Cheap: 0,
			Normal: 0,
			Expensive: 0,
		};
		for (let i = 0; i < prices.length; i++) {
			let option;
			if (prices[i] <= 100) {
				option = 'Cheap';
			}
			if (prices[i] > 100 && prices[i] <= 500) {
				option = 'Normal';
			}
			if (prices[i] > 500) {
				option = 'Expensive';
			}
			priceBucket[option] = priceBucket[option] ? priceBucket[option] + 1 : 1;
		}
		setData(priceBucket);
		// eslint-disable-next-line
	}, [Bookings]);
	const fontFamily =
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
	const backgroundColors = [
		'rgba(72, 255, 66, 0.5)',
		'rgba(66, 102, 245, 0.5)',
		'rgba(245, 29, 29, 0.5)',
	];
	const borderColors = [
		'rgba(72, 245, 66, 1)',
		'rgba(66, 102, 245, 1)',
		'rgba(245, 29, 29, 1)',
	];
	const chartTitleStyle = {
		display: true,
		text: 'Expenditure Overview on Chart',
		fontSize: 25,
		fontColor: '#FF5A2B',
		fontStyle: 'normal',
		fontFamily: fontFamily,
	};
	const scaleConfig = {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	};
	const tooltipConfig = {
		titleFontFamily: fontFamily,
		titleFontStyle: 'normal',
		titleFontSize: 16,
		bodyFontFamily: fontFamily,
		bodyFontSize: 14,
		caretSize: 5,
		cornerRadius: 10,
	};
	const dateSet = {
		label: 'No. Of Events',
		data: [...Object.values(data), Math.max(...Object.values(data)) + 0.5],
		backgroundColor: backgroundColors,
		borderColor: borderColors,
		borderWidth: 1,
	};
	return (
		<div className='container py-2' style={{ height: '50vh' }}>
			<Bar
				data={{
					labels: Object.keys(data),
					datasets: [dateSet],
				}}
				options={{
					scales: scaleConfig,
					title: chartTitleStyle,
					maintainAspectRatio: false,
					tooltips: tooltipConfig,
					legend: {
						display: false,
					},
				}}
			/>
		</div>
	);
};

export default Charts;
