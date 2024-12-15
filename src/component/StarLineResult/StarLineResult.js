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

	return (
		<>
			<div className='mt-8'>
				<div className="py-4 ">
					<div className="bg-gradient-to-r from-[#e11d48] to-[#c013fa] text-white text-center py-2 font-bold text-lg">
						STARLINE RESULT
					</div>
					<div className='bg-pink-50 pb-6'>
						<table className="w-full border-collapse border border-gray-300 container bg-white">
							<thead>
								<tr>
									<th className="border border-gray-300 px-4 py-2 text-gray-600">Time</th>
									<th className="border border-gray-300 px-4 py-2 text-gray-600">Result</th>
									<th className="border border-gray-300 px-4 py-2 text-gray-600">Time</th>
									<th className="border border-gray-300 px-4 py-2 text-gray-600">Result</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item, index) => (
									index % 2 === 0 && (
										<tr key={index}>
											<td className="border border-gray-300 px-4 py-2 text-center">
												{data[ index ]?.time}
											</td>
											<td className="border border-gray-300 px-4 py-2 text-center">
												{data[ index ]?.result}
											</td>
											<td className="border border-gray-300 px-4 py-2 text-center">
												{data[ index + 1 ]?.time || ''}
											</td>
											<td className="border border-gray-300 px-4 py-2 text-center">
												{data[ index + 1 ]?.result || ''}
											</td>
										</tr>
									)
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default StarLineResult;