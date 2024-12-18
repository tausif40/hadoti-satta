import React from 'react'
import { LuRefreshCw } from "react-icons/lu";

const ScheduleCard = ({ title, timeLabel, time, result }) => {
	return (
		<div className="w-full max-w-4xl p-1 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 relative overflow-hidden relative">
			<div className="bg-gradient-to-br from-purple-800 via-pink-500 to-orange-300 rounded-md p-4 text-center">
				<h2 className="text-white text-2xl font-bold uppercase tracking-wider mb-1 drop-shadow-md">
					{title}
				</h2>
				<p className="text-gray-100 font-semibold text-2xl py-3">
					{result}
				</p>
				<p className="text-white text-lg">
					{timeLabel}: <span className="font-semibold text-yellow-300 drop-shadow-md">{time}</span>
				</p>
			</div>
			<button className='absolute top-4 right-4 shadow-sm px-2 py-1 rounded-md bg-[#931c2c] hover:bg-[#6e1d4f] text-white font-light text-sm flex gap-2 item-center transition-all'>
				<p>Refresh</p>
				<p className='mt-[3px]'><LuRefreshCw size={14} /></p>
			</button>
		</div>
	);
};

function LiveResult() {

	const schedules = [
		{ title: "Hadoti Day", timeLabel: "Open", time: "11:45 AM", result: '15-563-69' },
		{ title: "Hadoti Day", timeLabel: "Close", time: "12:45 PM", result: '3-59-456' },
		{ title: "Hadoti Night", timeLabel: "Open", time: "07:45 PM", result: '236-56-8' },
		{ title: "Hadoti Night", timeLabel: "Close", time: "08:45 PM", result: '1-3-96' },
	];

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
					/>
				))}
			</div>
		</div>
	);
}
export default LiveResult;
