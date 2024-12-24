import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../app.url';


// const renderTable = (title, data) => {

// 	const formatDate = (dateString) => {
// 		const date = new Date(dateString);
// 		const day = String(date.getDate()).padStart(2, '0');
// 		const month = String(date.getMonth() + 1).padStart(2, '0');
// 		const year = String(date.getFullYear());
// 		return `${day}-${month}-${year}`;
// 	};
// 	//  border="1" style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}
// 	// const filteredData = data?.filter(item => item.title === title);
// 	return (
// 		<table className="w-full border-collapse border-gray-300">
// 			<thead>
// 				<tr className='bg-gradient-to-tl from-red-300 to-yellow-200 grid grid-cols-3'>
// 					<th className="px-4 py-2 text-gray-600">Date</th>
// 					<th className="px-4 py-2 text-gray-600">Open/Close</th>
// 					{/* <th className='text-start'>Time</th> */}
// 					<th className="px-4 py-2 text-gray-600 text-start">Result</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{data?.map((item, index) => (
// 					<tr key={index} className='border grid grid-cols-3 mt-2 bg-white/40'>
// 						<td className="px-4 py-4 text-center">{formatDate(item.createdAt)}</td>
// 						<td className="px-4 py-4 text-center">{item.timeLabel}</td>
// 						{/* <td>{item.time}</td> */}
// 						<td className="px-4 py-4 text-start ">{item.result}</td>
// 					</tr>
// 				))}
// 			</tbody>
// 		</table>
// 	);
// };

const ResultChat = () => {
	const [ data, setData ] = useState([])
	const token = sessionStorage.getItem("token");

	useEffect(() => {
		const fetchChat = async () => {
			try {
				await axios.get(`${BASE_URL}/monthly-schedules`, {
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${token}`
					},
				}).then((response) => {
					// console.log(response);
					setData(response?.data);
				}).catch((error) => {
					console.log(error);
				});
			} catch (error) {
				console.error('Error fetching schedules:', error);
			}
		};
		fetchChat();
	}, []);

	const groupByWeekAndMonth = (data) => {
		return data.reduce((acc, curr) => {
			const date = new Date(curr.createdAt);
			const week = getWeekNumber(date);
			const month = date.toLocaleString('default', { month: 'long' });
			if (!acc[ week ]) acc[ week ] = { month, events: [] };
			acc[ week ].events.push({ ...curr, day: date.getDay(), date: date.getDate() });
			return acc;
		}, {});
	};

	const getWeekNumber = (date) => {
		const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
		const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
		return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
	};

	const groupedData = groupByWeekAndMonth(data);

	const getMonthRange = (groupedData) => {
		const months = Object.values(groupedData).map((week) => week.month);
		return [ ...new Set(months) ].join(' to ');
	};

	const monthRange = getMonthRange(groupedData);

	const filterEventsByTitle = (events, title) => {
		return events.filter((event) => event.title === title);
	};

	const renderTable = (events, title) => (
		<div className="mb-6">
			<div className="text-lg font-bold text-center mb-4">{title}</div>
			<table className="table-auto w-full text-center border-collapse border border-purple-700">
				<thead>
					<tr className="bg-purple-900">
						{Array(7).fill(null).map((_, dayIndex) => (
							<th key={dayIndex} className="border border-purple-700 p-2">
								{events
									.filter((event) => event.day === dayIndex)
									.map((event) => event.date)[ 0 ] || ''}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{Array(7).fill(null).map((_, dayIndex) => (
							<td key={dayIndex} className="border border-purple-700 p-2">
								{events.filter((event) => event.day === dayIndex).map((event, idx) => (
									<div key={idx} className="text-sm">
										<div className="font-bold text-yellow-300">{event.timeLabel}:</div>
										{/* <div className="text-yellow-400">{event.time}</div> */}
										<div className="text-yellow-500">{event.result}</div>
									</div>
								))}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);

	return (
		<div className="bg-purple-800 min-h-screen text-white py-8 px-4">
			<h1 className="text-center text-3xl font-bold mb-6">Event Calendar</h1>
			<h2 className="text-center text-2xl mb-4">{monthRange}</h2>
			<div className="border-4 border-purple-900 p-4 rounded-md">
				{Object.entries(groupedData).map(([ week, { events } ], index) => (
					<div key={index} className="mb-8">
						<div className="text-lg font-bold text-center mb-4">Week {week}</div>
						{renderTable(filterEventsByTitle(events, 'Hadoti Day'), 'Hadoti Day')}
						{renderTable(filterEventsByTitle(events, 'Hadoti Night'), 'Hadoti Night')}
					</div>
				))}
			</div>
		</div>
	);
};

export default ResultChat;
