import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LuRefreshCw } from "react-icons/lu";
import { BASE_URL } from '../../app.url';
import toast from 'react-hot-toast';

const ScheduleCard = ({ title, timeLabel, time, result, refresh }) => {
	const [ isRefreshing, setIsRefreshing ] = useState(false);

	const handleRefresh = async () => {
		// console.log(isRefreshing);
		setIsRefreshing(true);
		// await refresh();
		// setIsRefreshing(false);
		refresh((prev) => !prev);
		setTimeout(() => setIsRefreshing(false), 1000);
	};

	return (
		<div className="w-full max-w-4xl p-1 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 relative overflow-hidden">
			<div className="bg-gradient-to-br from-purple-800 via-pink-500 to-orange-300 rounded-md p-4 text-center">
				<h2 className="text-white text-2xl font-bold uppercase tracking-wider mb-1 drop-shadow-md">
					{title}
				</h2>
				<p className="text-gray-100 font-semibold text-2xl py-3">
					{result ? result : '_ _ _ _ _'}
				</p>
				<p className="text-white text-lg">
					{timeLabel}: <span className="font-semibold text-yellow-300 drop-shadow-md">{time}</span>
				</p>
			</div>
			<button
				className='absolute top-4 right-4 shadow-sm px-2 py-1 rounded-md bg-[#931c2c] hover:bg-[#6e1d4f] text-white font-light text-sm flex gap-2 items-center transition-all'
				onClick={handleRefresh}
			>
				<p> {isRefreshing ? 'Refresh...' : 'Refresh'}</p>
				<p className={`mt-[3px] ${isRefreshing ? 'animate-spin' : ''}`}><LuRefreshCw size={14} /></p>
			</button>
		</div>
	);
};

function LiveResult() {
	const [ toggle, setToggle ] = useState(false);
	const [ schedules, setSchedules ] = useState([]);
	const token = sessionStorage.getItem("token");

	useEffect(() => {
		const fetchSchedules = async () => {
			try {
				await axios.get(`${BASE_URL}/schedules`, {
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${token}`
					},
				}).then((response) => {
					console.log(response);
					setSchedules(response.data);
				}).catch((error) => {
					console.log(error);
				});
			} catch (error) {
				console.error('Error fetching schedules:', error);
				toast.error('Network Error');
			}
		};
		fetchSchedules();
	}, [ toggle ]);

	return (
		<div className="resultBg border my-8">
			<p className="liveHeading flex justify-center items-center py-2 gap-4 text-2xl font-medium text-red-800">
				<img src="/assets/img/zap.png" alt="" className="w-10" />
				<p>Fastest Result Updates</p>
				<img src="/assets/img/zap.png" alt="" className="w-10" />
			</p>
			<div className="container flex flex-col gap-5 items-center justify-center py-10">
				{schedules.map((schedule, index) => (
					<ScheduleCard
						key={index}
						title={schedule.title}
						timeLabel={schedule.timeLabel}
						time={schedule.time}
						result={schedule.result}
						refresh={setToggle}
					/>
				))}
			</div>
		</div>
	);
}

export default LiveResult;
