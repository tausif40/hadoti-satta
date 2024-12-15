import React from 'react'
import { RefreshCw } from 'lucide-react';
import { LuRefreshCw } from "react-icons/lu";

function LiveResult() {

	const nights = [
		{ name: 'ACHAL NIGHT', result: '390-2', time: '10:20 AM', lastUpdated: '5 min' },
		// { name: 'AMBAR NIGHT', result: '167-4', time: '10:20 AM', lastUpdated: '5 min' },
		{ name: 'BHARTI NIGHT', result: '346-3', time: '10:20 AM', lastUpdated: '5 min' },
		{ name: 'MAHARANI NIGHT', result: 'Loading...', time: '10:20 AM', lastUpdated: '5 min' },
		{ name: 'NAGORI NIGHT', result: '150-6', time: '10:20 AM', lastUpdated: '5 min' },
		// { name: 'SADABAHAR NIGHT', result: '369-8', time: '10:20 AM', lastUpdated: '5 min' },
		// { name: 'SUPER NIGHT', result: '129-2', time: '10:20 AM', lastUpdated: '5 min' },
	];

	return (
		<>
			<div className=' border bg-yellow-50 my-8'>
				<p className='flex justify-center items-center py-2 gap-4 bg-orange-300 text-2xl font-medium text-headingText'>
					<img src="/assets/img/zap.png" alt="" className='w-10' />
					<p> Fastest Result Updates </p>
					<img src="/assets/img/zap.png" alt="" className='w-10' />
				</p>
				<div className="container flex items-center justify-center py-10">
					<div className="grid grid-cols-1  gap-6 px-6 w-full">
						{nights.map((night, index) => (
							<div
								key={index}
								className="bg-white shadow-md hover:shadow-xl rounded-lg flex flex-col items-center justify-center overflow-hidden border-2 border-gray-500">
								<div className='flex justify-between w-full relative p-3 sm:p-4 '>
									<p className=' m-auto'>
										<h2 className="text-2xl sm:text-3xl font-semibold text-gray-600">{night.name}</h2>
										{/* <h2 className="text-sm text-gray-500">{night.time}</h2> */}
										<p className="text-xs sm:text-sm font-light cursor-pointer text-white px-2 py-1 flex gap-2 items-center mt-3 rounded-sm bg-[#1e3c50] hover:bg-[#34c1c1] transition-all m-auto max-w-min block sm:hidden">
											<p>Refresh</p>
											<p className='text-xs sm:text-sm'><LuRefreshCw /></p>
										</p>
									</p>
									<p className="text-xs sm:text-sm font-light cursor-pointer text-white absolute sm:flex border right-5 items-center px-2 py-1 gap-2 rounded-md bg-[#1e3c50] hover:bg-[#34c1c1] transition-all hidden sm:block min-w-max">
										<p>Refresh</p>
										<p className='text-xs sm:text-sm'><LuRefreshCw /></p>
									</p>
								</div>
								<div className="pt-4 pb-5 text-gray-700 w-full flex flex-col item-center bg-gray-100">
									<p className="text-2xl font-bold m-auto">{night.result}</p>
									<p className="text-xs font-light pt-2 text-gray-400 m-auto">Last updated: {night.lastUpdated} ago</p>
								</div>
								{/* <button
									className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
								>
									Refresh
								</button> */}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default LiveResult