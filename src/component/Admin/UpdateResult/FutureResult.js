import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../../app.url';
import moment from 'moment';

function FutureResult({ toggle }) {
	const [ schedules, setSchedules ] = useState([]);
	const [ isPopupOpen, setIsPopupOpen ] = useState(false);
	const [ editData, setEditData ] = useState({});
	const [ newSchedule, setNewSchedule ] = useState({});
	const token = sessionStorage.getItem("token");

	const editSchedules = (data) => {
		console.log(data);
		// setEditData(editData);
		setEditData({
			...data, time: convertTo12HourFormat(data.time)
		});
		setIsPopupOpen(true);
	};

	const convertTo12HourFormat = (time) => {
		const [ hours, minutes ] = time.split(':');
		const intHours = parseInt(hours, 10);
		const modifier = intHours >= 12 ? 'PM' : 'AM';
		const adjustedHours = intHours % 12 || 12;
		return `${adjustedHours.toString().padStart(2, '0')}:${minutes} ${modifier}`;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditData((prev) => ({ ...prev, [ name ]: value }));
	};
	const handleUpdate = async (schedule) => {
		// console.log(editData);
		const data = { time: editData.time, result: editData.result }
		try {
			await axios.put(`${BASE_URL}/schedules/${schedule._id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			}).then((response) => {
				console.log(response);
				// setSchedules(response.data);
				fetchSchedules();
				setIsPopupOpen(false);
				toast.success('Update Success');
			}).catch((error) => {
				console.log(error);
			});
		} catch (error) {
			console.error('Error fetching schedules:', error);
			toast.error('Failed to load schedules');
		}
		// setNewSchedule(schedule);
	};

	const fetchSchedules = async () => {
		try {
			await axios.get(`${BASE_URL}/schedulesby`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			}).then((response) => {
				// console.log(response);
				setSchedules(response.data);
			}).catch((error) => {
				console.log(error);
			});
		} catch (error) {
			console.error('Error fetching schedules:', error);
			toast.error('Failed to load schedules');
		}
	};

	useEffect(() => {
		fetchSchedules();
	}, [ toggle ]);


	const deleteSchedules = async (id) => {
		const isConfirmed = window.confirm('Are you sure?');
		if (isConfirmed) {
			const toastId = toast.loading("Deleting...");
			try {
				await axios.delete(`${BASE_URL}/schedules/${id}`, {
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${token}`,
					},
				}).then((response) => {
					console.log(response);
					fetchSchedules();
					toast.success("Delete successful!", { id: toastId });
				})
					.catch((error) => {
						console.log(error);
						toast.error("Delete Failed", { id: toastId });
					});
			} catch (error) {
				console.error('Error fetching schedules:', error);
				toast.error('Failed to load schedules');
				toast.error("Delete Failed", { id: toastId });
			}
		} else {
			console.log('Delete action was cancelled');
		}
	};

	return (
		<>

			{isPopupOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-80">
						<label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
						<select
							id="title"
							name="title"
							value={editData.title || ''}
							onChange={handleInputChange}
							className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent"
						>
							<option value="Hadoti Day">Hadoti Day</option>
							<option value="Hadoti Night">Hadoti Night</option>
						</select>

						<label htmlFor="time" className="block text-sm font-medium text-gray-700 mt-4">Time</label>
						<div className="flex items-center space-x-2">
							<input
								id="time"
								type="text"
								name="time"
								placeholder="hh:mm"
								value={editData.time ? editData.time.split(' ')[ 0 ] : ''}
								onChange={(e) => {
									const time = `${e.target.value} ${editData.time?.split(' ')[ 1 ] || 'AM'}`;
									setEditData((prev) => ({ ...prev, time }));
								}}
								className="p-2 w-2/3 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent"
							/>
							<select
								name="meridian"
								value={editData.time ? editData.time.split(' ')[ 1 ] : 'AM'}
								onChange={(e) => {
									const time = `${editData.time?.split(' ')[ 0 ] || '12:00'} ${e.target.value}`;
									setEditData((prev) => ({ ...prev, time }));
								}}
								className="p-2 w-1/3 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent"
							>
								<option value="AM">AM</option>
								<option value="PM">PM</option>
							</select>
						</div>

						<label htmlFor="result" className="block text-sm font-medium text-gray-700 mt-4">Result</label>
						<input
							id="result"
							type="text"
							name="result"
							value={editData.result || ''}
							onChange={handleInputChange}
							className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent"
						/>

						<div className="mt-6 flex justify-end space-x-2">
							<button onClick={() => handleUpdate(editData)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
							<button onClick={() => setIsPopupOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
						</div>
					</div>
				</div>
			)}


			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{schedules?.map((schedule, index) => (
					<div
						key={index}
						className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-1 rounded-lg shadow-lg relative"
					>
						<div className="bg-white p-4 rounded-lg flex flex-col items-center">
							<h2 className="text-xl font-semibold mb-2">{schedule.title}</h2>
							<p className="text-lg font-bold text-purple-600">{schedule.result}</p>
							<div className="mt-4 text-sm flex ">
								<p className="text-gray-600">Date: {moment(schedule.date).format('DD-MM-YYYY')}</p>&nbsp;/&nbsp;
								<p className="text-gray-600">Time- {schedule.time}</p>
							</div>
						</div>
						<div className='absolute top-2 right-2 flex gap-2'>
							<div className='cursor-pointer border rounded p-1 hover:bg-gray-200' onClick={() => editSchedules(schedule)}>
								<img src="./assets/img/edit.png" alt="" className='w-5' />
							</div>
							<div className=' cursor-pointer border rounded p-1 hover:bg-gray-200' onClick={() => deleteSchedules(schedule._id)}>
								<img src="./assets/img/delete.png" alt="" className='w-5' />
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default FutureResult