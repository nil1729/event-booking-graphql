import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Progress from '../Progress';
import EventContext from '../../context/EventContext.js';
import AuthContext from '../../context/AuthContext.js';
import AlertContext from '../../context/AlertContext.js';
import BookingItem from '../BookingItem';

const Bookings = () => {
	const authContext = useContext(AuthContext);
	const { validateAuth } = authContext;
	const alertContext = useContext(AlertContext);
	const { showAlert } = alertContext;
	const eventContext = useContext(EventContext);
	const { Bookings } = eventContext;
	const history = useHistory();
	const [bookings, setBookings] = useState(Bookings);
	useEffect(() => {
		setBookings(Bookings);
		// eslint-disable-next-line
	}, [Bookings]);
	const cancelBooking = async () => {
		if (await validateAuth()) {
			return;
		} else {
			showAlert('warning', [{ message: 'Plaese Login First' }]);
			history.push('/auth');
		}
	};
	return (
		<div className='container'>
			<div className='jumbotron py-2'>
				<h2 className='text-center'>Your Bookings</h2>
			</div>
			<div className='container px-2'>
				<div className='list-group'>
					{!bookings ? (
						<Progress />
					) : bookings.length === 0 ? (
						<p className='lead text-center'>You don't have Any Bookings</p>
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
