import React, { useState, useEffect, useContext } from 'react';
import Progress from '../Progress';
import AuthContext from '../../context/AuthContext.js';
import BookingItem from '../BookingItem';

const Bookings = () => {
	const [loading, setLoading] = useState(false);
	const [bookings, setBookings] = useState([]);
	const authContext = useContext(AuthContext);
	const { token } = authContext;
	const sendRequest = async requestData => {
		setLoading(true);
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', `Bearer ${token}`);
		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(requestData),
			redirect: 'follow',
		};
		const response = await fetch(
			'http://localhost:5000/graphql',
			requestOptions
		);
		const JSONData = await response.json();
		setBookings(JSONData.data.bookings);
		setLoading(false);
	};
	const requestData = {
		query: `
			query {
				bookings {
					_id
					event {
						title
						price
						description
						date
					}
					user {
						email
					}
					createdAt
					updatedAt
				}
			}
		`,
	};
	useEffect(() => {
		sendRequest(requestData);
		// eslint-disable-next-line
	}, []);
	const cancelBooking = () => {
		sendRequest(requestData);
	};
	return (
		<div className='container'>
			<div className='jumbotron py-2'>
				<h2 className='text-center'>Your Bookings</h2>
			</div>
			<div className='container px-2'>
				<div className='list-group'>
					{loading ? (
						<Progress />
					) : (
						bookings.map(booking => (
							<BookingItem
								key={booking._id}
								booking={booking}
								cancelBooking={cancelBooking}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Bookings;
