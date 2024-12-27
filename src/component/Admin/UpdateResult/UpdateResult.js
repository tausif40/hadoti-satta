import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../../app.url';
import FutureResult from './FutureResult';
import { useNavigate } from 'react-router-dom';

const UpdateResult = () => {
	const navigate = useNavigate();
	const [ toggle, setToggle ] = useState(false);
	const [ error, setError ] = useState({});
	const [ newSchedule, setNewSchedule ] = useState({
		title: '',
		time: '',
		result: '',
	});

	const token = sessionStorage.getItem("token");
	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (!token) {
			navigate('/admin');
		}
	}, [ token ]);

	function convertTo12HourFormat(time24) {
		const [ hours, minutes ] = time24.split(':');
		let hoursInt = parseInt(hours);
		const ampm = hoursInt >= 12 ? 'PM' : 'AM';
		hoursInt = hoursInt % 12;
		if (hoursInt === 0) hoursInt = 12;
		return `${hoursInt}:${minutes} ${ampm}`;
	}

	const formatResult = (value, isBackspace) => {
		value = value.replace(/\D/g, '');
		value = value.slice(0, 8);
		if (value.length > 2) {
			value = value.slice(0, 3) + '-' + value.slice(3);
		}
		if (value.length > 5) {
			value = value.slice(0, 6) + '-' + value.slice(6);
		}
		if (isBackspace) {
			value = value.replace(/-$/, '');
		}

		return value;
	};

	const validateField = (name, value) => {
		let errorMessage = '';
		if (name === 'title' && !value) {
			errorMessage = 'Title is required';
		} else if (name === 'time' && !value) {
			errorMessage = 'Time is required';
		} else if (name === 'result' && !value) {
			errorMessage = 'Result is required';
		}
		return errorMessage;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const isBackspace = e.nativeEvent.inputType === 'deleteContentBackward';
		let formattedValue = value;

		// if (name === 'result') {
		// 	formattedValue = formatResult(value, isBackspace);
		// }

		const errorMessage = validateField(name, formattedValue);
		setError((prev) => ({ ...prev, [ name ]: errorMessage }));
		setNewSchedule((prev) => ({ ...prev, [ name ]: formattedValue }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// console.log(newSchedule?.result);
		// const regex = /^\d{3}-\d{2}-\d{3}$/;
		// if (!regex.test(newSchedule?.result)) {
		// 	const errorMessage = 'Result must be in the format 123-12-123';
		// 	setError((prev) => ({ ...prev, result: errorMessage }));
		// 	return;
		// }

		const toastId = toast.loading("Updating...");

		const newErrors = {
			title: validateField('title', newSchedule.title),
			time: validateField('time', newSchedule.time),
			result: validateField('result', newSchedule.result),
		};

		setError(newErrors);
		if (Object.values(newErrors).some((err) => err)) {
			toast.error("Validation error:", { id: toastId });
			return;
		}

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
			// setNewSchedule({ title: '', time: '', result: '' });
			setError({});
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
							<div>
								<label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
								<select
									id="title"
									name="title"
									value={newSchedule.title}
									onChange={handleInputChange}
									className="p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent focus:outline-red-500 w-full"
								>
									<option value="" disabled>Select Title</option>
									<option value="Hadoti Day">Hadoti Day</option>
									<option value="Hadoti Night">Hadoti Night</option>
								</select>
								{error.title && (
									<p className="text-red-500 text-sm mt-1">{error.title}</p>
								)}
							</div>

							<div>
								<label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
								<input
									id="time"
									type="time"
									name="time"
									value={newSchedule.time}
									onChange={handleInputChange}
									className="p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent focus:outline-red-500 w-full"
								/>
								{error.time && (
									<p className="text-red-500 text-sm mt-1">{error.time}</p>
								)}
							</div>

							<div className="col-span-2">
								<label htmlFor="result" className="block text-sm font-medium text-gray-700">Result</label>
								<input
									id="result"
									type="text"
									name="result"
									value={newSchedule.result}
									onChange={handleInputChange}
									maxLength="10"
									placeholder="Result"
									className="p-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent focus:outline-red-500"
								/>
								{error.result && (
									<p className="text-red-500 text-sm mt-1">{error.result}</p>
								)}
							</div>
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
		</div>
	);
};

export default UpdateResult;
