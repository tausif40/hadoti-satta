import React from 'react'
import { RefreshCw } from 'lucide-react';
import { LuRefreshCw } from "react-icons/lu";

const ScheduleCard = ({ title, timeLabel, time }) => {
	return (
		<div className="w-full max-w-xl p-1 rounded-lg bg-gradient-to-br from-pink-500 to-green-500 relative overflow-hidden">
			<div className="bg-gradient-to-br from-purple-800 via-pink-500 to-orange-300 rounded-md p-6 text-center">
				<h2 className="text-white text-2xl font-bold uppercase tracking-wider mb-2 drop-shadow-md">
					{title}
				</h2>
				<p className="text-white text-lg">
					{timeLabel}: <span className="font-bold text-yellow-300 drop-shadow-md">{time}</span>
				</p>
			</div>
		</div>
	);
};

function LiveResult() {

	const schedules = [
		{ title: "Hadoti Day", timeLabel: "Open", time: "11:45 AM" },
		{ title: "Hadoti Day", timeLabel: "Close", time: "12:45 PM" },
		{ title: "Hadoti Night", timeLabel: "Open", time: "07:45 PM" },
		{ title: "Hadoti Night", timeLabel: "Close", time: "08:45 PM" },
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
					/>
				))}
			</div>
		</div>
	);
}
// const nights = [
// 	{name: 'HADOTI DAY', open: '11:45 AM' },
// 	{name: 'HADOTI DAY', close: '12:45 PM' },
// 	{name: 'HADOTI NIGHT', open: '07:45 PM' },
// 	{name: 'HADOTI NIGHT', close: '08:45 PM' },
// ];

// return (
// 	<>
// 		<div className="border bg-yellow-50 my-8">
// 			<p className="liveHeading flex justify-center items-center py-2 gap-4 text-2xl font-medium text-red-800">
// 				<img src="/assets/img/zap.png" alt="" className="w-10" />
// 				<p>Fastest Result Updates</p>
// 				<img src="/assets/img/zap.png" alt="" className="w-10" />
// 			</p>
// 			<div className="container flex items-center justify-center py-10">
// 				<div className="grid grid-cols-1 gap-6 px-6 w-full">
// 					{nights.map((night, index) => (
// 						<div
// 							key={index}
// 							className="gradientBorder bg-white shadow-md hover:shadow-xl rounded-lg flex flex-col items-center justify-center overflow-hidden p-4"
// 						>
// 							{/* Row 1: Name */}
// 							<div className="w-full text-center mb-2">
// 								<h2 className="text-2xl sm:text-3xl font-semibold text-gray-600">{night.name}</h2>
// 							</div>
// 							{/* Row 2: Open Time */}
// 							{night.open && (
// 								<div className="w-full text-center mb-2">
// 									<p className="text-xl font-bold text-gray-700">Open: {night.open}</p>
// 								</div>
// 							)}
// 							{/* Row 3: Close Time */}
// 							{night.close && (
// 								<div className="w-full text-center mb-2">
// 									<p className="text-xl font-bold text-gray-700">Close: {night.close}</p>
// 								</div>
// 							)}
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	</>
// );


export default LiveResult;
