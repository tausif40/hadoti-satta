import React from 'react';

const StarLineResult = () => {
	const data = [
		{ time: '09:30 AM', result: '458-7' },
		{ time: '10:30 PM', result: '167-4' },
		{ time: '11:00 PM', result: '268-6' },
		{ time: '11:30 PM', result: '149-4' },
		{ time: '12:00 PM', result: '227-1' },
		{ time: '01:30 PM', result: '270-6' },
		{ time: '02:30 PM', result: '447-5' },
		{ time: '03:30 PM', result: '558-8' },
		{ time: '04:30 PM', result: '669-1' },
		{ time: '05:30 PM', result: '779-3' },
	];

	const half = Math.ceil(data.length / 2);
	const firstHalf = data.slice(0, half);
	const secondHalf = data.slice(half);

	return (
		<>
			<div className='mt-8'>
				<div className="py-4">
					<div className="bg-gradient-to-r from-[#e11d48] to-[#c013fa] text-white text-center py-2 font-bold text-lg">
						STARLINE RESULT
					</div>
					<div className='bg-pink-50 pb-6'>
						<div className="container flex gap-5 flex-col sm:flex-row">
							{/* First Column */}
							<table className="w-full sm:w-1/2 border-collapse border border-gray-300 bg-white mt-4 sm:mt-0">
								<thead>
									<tr className='bg-red-200 sm:bg-white'>
										<th className="border border-gray-300 px-4 py-2 text-gray-600">Time</th>
										<th className="border border-gray-300 px-4 py-2 text-gray-600">Result</th>
									</tr>
								</thead>
								<tbody>
									{firstHalf.map((item, index) => (
										<tr key={index}>
											<td className="border border-gray-300 px-4 py-2 text-center">
												{item.time}
											</td>
											<td className="border border-gray-300 px-4 py-2 text-center">
												{item.result}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							{/* Second Column */}
							<table className="w-full sm:w-1/2 border-collapse border border-gray-300 bg-white">
								<thead>
									<tr className='bg-red-200 sm:bg-white'>
										<th className="border border-gray-300 px-4 py-2 text-gray-600">Time</th>
										<th className="border border-gray-300 px-4 py-2 text-gray-600">Result</th>
									</tr>
								</thead>
								<tbody>
									{secondHalf.map((item, index) => (
										<tr key={index}>
											<td className="border border-gray-300 px-4 py-2 text-center">
												{item.time}
											</td>
											<td className="border border-gray-300 px-4 py-2 text-center">
												{item.result}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StarLineResult;
