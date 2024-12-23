import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../../app.url';
import FutureResult from './FutureResult';
import { useNavigate } from 'react-router-dom';

const UpdateResult = () => {
	const navigate = useNavigate();
	const [ schedules, setSchedules ] = useState([]);
	const [ toggle, setToggle ] = useState(false);
	const [ newSchedule, setNewSchedule ] = useState({
		title: '',
		timeLabel: '',
		time: '',
		result: '',
	});

	const token = sessionStorage.getItem("token");
	useEffect(() => {
		const token = sessionStorage.getItem('token')
		if (!token) {
			navigate('/admin')
		}
	}, [])


	function convertTo12HourFormat(time24) {
		const [ hours, minutes ] = time24.split(':');
		let hoursInt = parseInt(hours);
		const ampm = hoursInt >= 12 ? 'PM' : 'AM';
		hoursInt = hoursInt % 12;
		if (hoursInt === 0) hoursInt = 12;
		return `${hoursInt}:${minutes} ${ampm}`;
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewSchedule((prev) => ({ ...prev, [ name ]: value }));
	};

	const handleSubmit = async (e) => {
		const toastId = toast.loading("Updating...");
		e.preventDefault();

		const time12 = convertTo12HourFormat(newSchedule.time);

		const scheduleData = { ...newSchedule, time: time12 };
		console.log(scheduleData);
		await axios.post(`${BASE_URL}/schedules`, scheduleData, {
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			console.log('API Response:', response.data);
			setToggle((pre) => !pre);
			setNewSchedule({ title: '', timeLabel: '', time: '', result: '' });
			toast.success("Update successful!", { id: toastId });
		}).catch((error) => {
			console.log(error);
			toast.error("Update Failed", { id: toastId });
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 px-2 py-8 sm:p-8">
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
					<FutureResult toggle={toggle} />
				</div>
			</div>
		</div >
	);
};

export default UpdateResult;
