import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LuRefreshCw } from "react-icons/lu";
import { BASE_URL } from '../../app.url';
import toast from 'react-hot-toast';

const ScheduleCard = ({ title, result, refresh }) => {
	const [ isRefreshing, setIsRefreshing ] = useState(false);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		// await refresh();
		// setIsRefreshing(false);
		refresh((prev) => !prev);
		setTimeout(() => setIsRefreshing(false), 1000);
	};
	// console.log(result);

	return (
		<div className="w-full max-w-4xl p-1 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 sm:relative overflow-hidden">
			<div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-300 rounded-md p-4 text-center">
				<h2 className="text-white text-2xl font-bold uppercase tracking-wider mb-1 drop-shadow-md">
					{title}
				</h2>
				<div className='flex items-center justify-between text-[#58111a] font-medium md:px-5'>
					<p>{title === 'Hadoti Day' ? '11:45 AM' : title === 'Hadoti Night' && '6:45 PM'}</p>
					<p className="text-gray-100 font-semibold text-2xl py-3">
						{result ? result : '_ _ _ _ _'}
					</p>
					<p>{title === 'Hadoti Day' ? '12:45 PM' : title === 'Hadoti Night' && '7:45 PM'}</p>
				</div>
				<div className='hidden sm:block'>
					<button
						className='absolute top-4 right-4 shadow-sm px-2 py-1 rounded-md bg-[#b82641] hover:bg-[#6e1d4f] text-white font-light text-sm flex gap-2 items-center transition-all'
						onClick={handleRefresh}
					>
						<p> {isRefreshing ? 'Refreshing..' : 'Refresh'}</p>
						<p className={`mt-[3px] ${isRefreshing ? 'animate-spin' : ''}`}><LuRefreshCw size={14} /></p>
					</button>
				</div>

				<div className='sm:hidden block'>
					<button
						className='m-auto mt-2 shadow-sm px-2 py-1 rounded-md bg-[#b82641] hover:bg-[#6e1d4f] text-white font-light text-sm flex gap-2 items-center transition-all'
						onClick={handleRefresh}
					>
						<p> {isRefreshing ? 'Refreshing..' : 'Refresh'}</p>
						<p className={`mt-[3px] ${isRefreshing ? 'animate-spin' : ''}`}><LuRefreshCw size={14} /></p>
					</button>
				</div>
			</div>
		</div>
	);
};

function LiveResult() {
	const [ toggle, setToggle ] = useState(false);
	// const [ schedules, setSchedules ] = useState([]);
	const [ hadotiDay, setHadotiDay ] = useState(null);
	const [ hadotiNight, setHadotiNight ] = useState(null);

	const [ isRefreshing, setIsRefreshing ] = useState(false);

	const handleRefresh = async () => {
		// console.log(isRefreshing);
		setIsRefreshing(true);
		// await refresh();
		// setIsRefreshing(false);
		setIsRefreshing((prev) => !prev);
		setTimeout(() => setIsRefreshing(false), 1000);
	};


	useEffect(() => {
		const fetchSchedules = async () => {
			await axios.get(`${BASE_URL}/schedules`, {
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((response) => {
				// console.log(response);
				// setSchedules(response.data);
				const result = response.data;

				const day = result.find((item) => item.title === "Hadoti Day");
				const night = result.find((item) => item.title === "Hadoti Night");

				setHadotiDay(day);
				setHadotiNight(night);

			}).catch((error) => {
				console.log(error);
			});
		};

		fetchSchedules();
	}, [ toggle ]);

	return (
		<div className="resultBg border my-8">
			<p className="liveHeading flex justify-center items-center px-4 py-2 gap-4 text-xl sm:text-2xl font-medium text-red-800">
				<img src="/assets/img/zap.png" alt="" className="w-10" />
				<p className='text-center'>Fastest Result Updates</p>
				<img src="/assets/img/zap.png" alt="" className="w-10" />
			</p>
			<div className="container flex flex-col gap-5 items-center justify-center py-10">
				<ScheduleCard
					title='Hadoti Day'
					result={hadotiDay?.result}
					refresh={setToggle}
				/>
				<ScheduleCard
					title='Hadoti Night'
					result={hadotiNight?.result}
					refresh={setToggle}
				/>

			</div>
		</div>
	);
}

export default LiveResult;
