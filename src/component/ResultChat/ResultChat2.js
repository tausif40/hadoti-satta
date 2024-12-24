import React from 'react';
import monthlyData from './monthlyData.json';

const SattaMatkaCalendar = () => {
	const { month, year, data } = monthlyData;

	const getRandomPastelColor = () => {
		const hue = Math.floor(Math.random() * 360);
		return `hsl(${hue}, 70%, 85%)`;
	};

	const daysInMonth = new Date(year, new Date(`${month} 1, ${year}`).getMonth() + 1, 0).getDate();
	const firstDayOfMonth = new Date(`${month} 1, ${year}`).getDay();

	const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
	const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => `empty-${i}`);

	return (
		<div className="font-sans bg-gray-100 p-5 rounded-lg shadow-md">
			<h1 className="text-center text-gray-800 text-4xl mb-12 pb-2 font-bold shadow-sm">
				Hadoti Results Chart - {month} {year}
			</h1>
			<div className="grid grid-cols-7 gap-2 mb-5 px-8 mt-6">
				{[ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ].map(day => (
					<div key={day} className="text-center font-bold p-2 bg-gray-300 rounded">
						{day}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-2 px-8">
				{emptyDays.map(day => (
					<div key={day} className="p-2"></div>
				))}
				{calendarDays.map(day => {
					const dayData = data.find(item => new Date(item.date).getDate() === day);
					return (
						<div
							key={day}
							className="bg-white rounded-lg p-3 shadow-md min-h-[200px] overflow-auto mb-6"
						>
							<h3 className="text-center mb-2 text-gray-800 font-bold">
								{`${day} ${`Dec`} ${year}`}
							</h3>
							{dayData ? (
								dayData.entries.map(entry => (
									<div
										key={entry.id}
										className="mb-2 p-2 rounded-md"
										style={{ backgroundColor: getRandomPastelColor() }}
									>
										<p className="font-bold mb-1">{entry.title}</p>
										<div className='flex'>
											<p className="text-sm mb-1">
												{entry.timeLabel} -
												{/* - {entry.time} */}
											</p>
											<p className="font-bold text-red-600"> {entry.result}</p>
										</div>
									</div>
								))
							) : (
								<p className="text-center text-gray-500">No data</p>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SattaMatkaCalendar;

