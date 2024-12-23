import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../app.url';
import monthlyData from './monthlyData.json';


const FormattedResult = ({ result }) => {
	const parseResult = (input) => {
		const parts = input.split('-');
		let first = '', middle = '', last = '';

		if (parts.length === 1) {
			// Case for single number (e.g., "222")
			first = parts[ 0 ].slice(0, 3);
			middle = parts[ 0 ].slice(3, 5);
			last = parts[ 0 ].slice(5);
		} else if (parts.length === 2) {
			// Case for two parts (e.g., "1-3" or "123-36")
			if (parts[ 0 ].length === 1) {
				first = parts[ 0 ].padEnd(3, '*');
				last = parts[ 1 ].padEnd(3, '*');
			} else {
				first = parts[ 0 ].slice(0, 3);
				middle = parts[ 0 ].slice(3);
				last = parts[ 1 ].padEnd(3, '*');
			}
		} else if (parts.length === 3) {
			// Case for three parts (e.g., "403-77-389" or "123-562-69")
			first = parts[ 0 ].padEnd(3, '*');
			middle = parts[ 1 ].slice(0, 2);
			last = parts[ 2 ].padEnd(3, '*');
		}

		return { first, middle, last };
	};

	const { first, middle, last } = parseResult(result);
	return (
		<div className="text-xl px-4">
			<div className="grid grid-cols-3 text-center">
				<div className="col-span-1">{first[ 0 ] || '*'}</div>
				<div className="col-span-1"></div>
				<div className="col-span-1">{last[ 0 ] || '*'}</div>
			</div>
			<div className="grid grid-cols-3 text-center items-center">
				<div className="col-span-1">{first[ 1 ] || '*'}</div>
				<div className="col-span-1 text-3xl font-semibold">{middle || '*'}</div>
				<div className="col-span-1">{last[ 1 ] || '*'}</div>
			</div>
			<div className="grid grid-cols-3 text-center">
				<div className="col-span-1">{first[ 2 ] || '*'}</div>
				<div className="col-span-1"></div>
				<div className="col-span-1">{last[ 2 ] || '*'}</div>
			</div>
		</div>
	);
};


const ResultChat = () => {
	const [ data, setData ] = useState([])

	useEffect(() => {
		const fetchChat = async () => {
			try {
				await axios.get(`${BASE_URL}/monthly-schedules`, {
					headers: {
						'Content-Type': 'application/json',
					},
				}).then((response) => {
					console.log(response);
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
	function formatDate(dateString) {
		const [ year, month, day ] = dateString.split('-');
		return `${day}-${month}-${year}`;
	}

	return (
		<>
			<div className="text-center bg-red-300 text-gray-800 p-3">
				<p className="text-2xl font-bold">Hadoti Results Chart</p>
			</div>
			<div className="max-w-7xl w-full px-2 md:px-8 lg:px-16 m-auto">
				<div className="min-w-full overflow-x-auto border my-4 pb-4">
					<div className="min-w-[1150px]">
						{data?.map((dayData, index) => (
							<div key={index}>
								<div className="flex gap-4 px-4 items-center border-b">
									<div className="font-semibold">
										<p className=" min-w-36 px-1 py-1 lg:px-8 text-center text-xl">
											{dayData?._id && formatDate(dayData._id)}
										</p>
									</div>
									<div className="grid grid-cols-4 w-full">
										{dayData?.schedules?.map((entry, entryIndex) => (
											<React.Fragment key={entryIndex}>
												<div>
													<FormattedResult result={entry?.result} />
												</div>
											</React.Fragment>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>

	);
};

export default ResultChat;

