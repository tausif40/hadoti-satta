import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../app.url';
import Loader from '../Loader/Loader';


const FormattedResult = ({ result }) => {
	const parseResult = (input) => {
		const parts = input.split('-');
		let first = '*', middle = '*', last = '*';

		// Ensure the input is converted into "***-**-***" format
		if (parts.length === 3) {
			first = parts[ 0 ].slice(0, 3).padEnd(3, '*');
			middle = parts[ 1 ].slice(0, 2).padEnd(2, '*');
			last = parts[ 2 ].slice(0, 3).padEnd(3, '*');
		} else if (parts.length === 2) {
			first = parts[ 0 ].slice(0, 3).padEnd(3, '*');
			middle = parts[ 1 ].slice(0, 2).padEnd(2, '*');
			last = parts[ 1 ].slice(2).padEnd(3, '*');
		} else if (parts.length === 1) {
			first = parts[ 0 ].slice(0, 3).padEnd(3, '*');
			middle = parts[ 0 ].slice(3, 5).padEnd(2, '*');
			last = parts[ 0 ].slice(5).padEnd(3, '*');
		}

		return { first, middle, last };
	};

	const { first, middle, last } = parseResult(result);
	// console.log(parseFloat(first));


	return (
		<>
			{!isNaN(parseFloat(first)) || !isNaN(parseFloat(last)) ? (
				<div className="text-md sm:text-xl w-28 leading-3 py-2 px-2 text-gray-800 border-b md:border-b-0">
					<div className="grid grid-cols-3 text-center">
						<div className="textShadow font-semibold">{first[ 0 ] || '*'}</div>
						<div className=""></div>
						<div className="textShadow  font-semibold">{last[ 0 ] || '*'}</div>
					</div>
					<div className="grid grid-cols-3 text-center items-center">
						<div className="textShadow font-semibold">{first[ 1 ] || '*'}</div>
						<div className="textShadow text-xl sm:text-3xl font-extrabold">{middle || '*'}</div>
						<div className="textShadow font-semibold">{last[ 1 ] || '*'}</div>
					</div>
					<div className="grid grid-cols-3 text-center">
						<div className="textShadow font-semibold">{first[ 2 ] || '*'}</div>
						<div className=""></div>
						<div className="textShadow font-semibold">{last[ 2 ] || '*'}</div>
					</div>
				</div>
			) : (
				<div className="text-md leading-3 py-2 px-2 text-gray-800 border-b md:border-b-0">
					<div className="textShadow  font-semibold text-2xl md:text-4xl text-red-500">{result}</div>
				</div>
			)
			}
		</>
	);
};


const ResultChat = () => {
	const [ data, setData ] = useState([])
	const [ loading, setIsLoading ] = useState(false)

	useEffect(() => {
		const fetchChat = async () => {
			setIsLoading(true);
			try {
				await axios.get(`${BASE_URL}/monthly-schedules`, {
					headers: {
						'Content-Type': 'application/json',
					},
				}).then((response) => {
					// console.log(response);
					setData(response?.data);
					setIsLoading(false);
				}).catch((error) => {
					console.log(error);
					setIsLoading(false);
				});
			} catch (error) {
				console.error('Error fetching schedules:', error);
				setIsLoading(false);
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
			<div className='bg-gray-100'>
				<div className="text-center bg-red-300 text-gray-800 p-3">
					<p className="text-xl sm:text-2xl font-semibold sm:font-bold">Hadoti Results Chart</p>
				</div>
				<div className="max-w-2xl sm:max-w-3xl px-2 md:px-8 lg:px-16 m-auto">
					<div className="min-w-full overflow-x-auto border my-4 pb-4 bg-white">
						<div className="w-full">

							{loading ? <p className='m-auto text-center'><Loader /></p> :
								data?.map((dayData, index) => (
									<div key={index} className="whitespace-nowrap text-ellipsis">
										<div className="flex gap-2 md:gap-4 px-4 items-center border-b">
											<div className="font-semibold ">
												<p className="min-w-max sm:w-28 md:w-24 sm:px-2 md:px-4 text-center text-md sm:text-xl textShadow text-slate-800">
													{dayData?._id && formatDate(dayData._id)}
												</p>
											</div>
											<div className="flex w-ful">
												{dayData?.schedules?.map((entry, entryIndex) => (
													<React.Fragment key={entryIndex}>
														<div className="">
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
			</div>
		</>

	);
};

export default ResultChat;

