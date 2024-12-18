import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateResult = () => {
	const [ schedules, setSchedules ] = useState([]);
	const [ newSchedule, setNewSchedule ] = useState({
		title: '',
		timeLabel: '',
		time: '',
		result: '',
	});

	useEffect(() => {
		const fetchSchedules = async () => {
			try {
				// Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
				const response = await axios.get('YOUR_API_ENDPOINT');
				setSchedules(response.data);
			} catch (error) {
				console.error('Error fetching schedules:', error);
				toast.error('Failed to load schedules');
			}
		};

		// fetchSchedules();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewSchedule((prev) => ({ ...prev, [ name ]: value }));
	};

	const handleSubmit = async (e) => {
		const toastId = toast.loading("Updating...");
		e.preventDefault();
		try {
			// Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
			const response = await axios.post('YOUR_API_ENDPOINT', newSchedule);
			console.log('API Response:', response.data);
			setSchedules((prev) => [ ...prev, response.data ]);
			setNewSchedule({ title: '', timeLabel: '', time: '', result: '' });
			toast.success("Update successful!", { id: toastId });
		} catch (error) {
			console.error('Error posting data:', error);
			toast.error("Update Failed", { id: toastId });
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
			<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
				<div className="p-8">
					<h1 className="text-3xl font-semibold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
						Update Result
					</h1>

					<form onSubmit={handleSubmit} className="mb-8">
						<div className="grid grid-cols-2 gap-4">
							<select
								name="title"
								value={newSchedule.title}
								onChange={handleInputChange}
								className="p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent focus:outline-red-500"
								required
							>
								<option value="" disabled>Select Title</option>
								<option value="Hadoti Day">Hadoti Day</option>
								<option value="Hadoti Night">Hadoti Night</option>
							</select>
							<select
								name="timeLabel"
								value={newSchedule.timeLabel}
								onChange={handleInputChange}
								className="p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent focus:outline-red-500"
								required
							>
								<option value="" disabled>Time Label</option>
								<option value="Open">Open</option>
								<option value="Close">Close</option>
							</select>
							<input
								type="time"
								name="time"
								value={newSchedule.time}
								onChange={handleInputChange}
								className="p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent focus:outline-red-500"
								required
							/>
							<input
								type="text"
								name="result"
								value={newSchedule.result}
								onChange={handleInputChange}
								placeholder="Result"
								className="p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent focus:outline-red-500"
								required
							/>
						</div>
						<button
							type="submit"
							className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition duration-300"
						>
							Add Schedule
						</button>
					</form>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{schedules.map((schedule, index) => (
							<div
								key={index}
								className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-1 rounded-lg shadow-lg"
							>
								<div className="bg-white p-4 rounded-lg flex flex-col items-center">
									<h2 className="text-xl font-semibold mb-2">{schedule.title}</h2>
									<p className="text-lg font-bold text-purple-600">{schedule.result}</p>
									<p className="text-gray-600">{schedule.timeLabel}: {schedule.time}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateResult;
