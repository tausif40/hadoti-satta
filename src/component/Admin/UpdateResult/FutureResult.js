import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../../app.url';
import moment from 'moment';

function FutureResult({ toggle }) {
	const [ schedules, setSchedules ] = useState([]);

	const token = sessionStorage.getItem("token");


	const fetchSchedules = async () => {
		try {
			await axios.get(`${BASE_URL}/schedulesby`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			}).then((response) => {
				console.log(response);
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
								<p className="text-gray-600">{schedule.timeLabel}: {schedule.time}</p>
							</div>
						</div>
						<div className='absolute top-2 right-2 cursor-pointer border rounded p-1 hover:bg-gray-200' onClick={() => deleteSchedules(schedule._id)}>
							<img src="./assets/img/delete.png" alt="" className='w-5' />
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default FutureResult