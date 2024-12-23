import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../app.url';


const renderTable = (title, data) => {

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = String(date.getFullYear());
		return `${day}-${month}-${year}`;
	};
	//  border="1" style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}
	// const filteredData = data?.filter(item => item.title === title);
	return (
		<table className="w-full border-collapse border-gray-300">
			<thead>
				<tr className='bg-gradient-to-tl from-red-300 to-yellow-200 grid grid-cols-3'>
					<th className="px-4 py-2 text-gray-600">Date</th>
					<th className="px-4 py-2 text-gray-600">Open/Close</th>
					{/* <th className='text-start'>Time</th> */}
					<th className="px-4 py-2 text-gray-600 text-start">Result</th>
				</tr>
			</thead>
			<tbody>
				{data?.map((item, index) => (
					<tr key={index} className='border grid grid-cols-3 mt-2 bg-white/40'>
						<td className="px-4 py-4 text-center">{formatDate(item.createdAt)}</td>
						<td className="px-4 py-4 text-center">{item.timeLabel}</td>
						{/* <td>{item.time}</td> */}
						<td className="px-4 py-4 text-start ">{item.result}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

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

	console.log(data);

	// const half = Math.ceil(data.length / 2);
	// const firstHalf = data.slice(0, half);
	// const secondHalf = data.slice(half);

	return (
		<>
			<div className='mt-8'>
				<div className="py-4">
					<div className="bg-gradient-to-r from-[#e11d48] to-[#c013fa] text-white text-center py-2 font-bold text-lg">
						HADOTI PANEL CHAT
					</div>
					<div className='bg-gradient-to-tr from-red-300 to-purple-300 pb-6'>
						<div className='container pt-4 grid grid-cols-1 gap-10 '>
							<div className='w-full border p-2 rounded'>
								{/* <h1 className='w-full bg-red-400 text-xl font-semibold p-2 text-center mb-2 text-gray-900'>Hadoti Day Result</h1> */}
								{renderTable("Hadoti Day", data)}
							</div>
							{/* <div className='w-full border p-2 rounded'>
								<h1 className='w-full bg-red-400 text-xl font-semibold p-2 text-center mb-2 text-gray-900'>Hadoti Night Result</h1>
								{renderTable("Hadoti Night", data)}
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResultChat;
