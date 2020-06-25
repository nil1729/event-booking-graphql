import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AuthContext from '../context/AuthContext.js';
const BookingItem = ({ booking, cancelBooking }) => {
	const formatDate = date => {
		return moment(date).format('Do MMM YYYY hh:mm a');
	};
	const authContext = useContext(AuthContext);
	const { token } = authContext;
	const sendRequest = async requestData => {
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', `Bearer ${token}`);
		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(requestData),
			redirect: 'follow',
		};
		await fetch('http://localhost:5000/graphql', requestOptions);
	};
	const requestData = {
		query: `
        mutation {
            cancelBooking(bookingID: "${booking._id}") {
              title
            }
          }
		`,
	};
	const handleCancel = async () => {
		await sendRequest(requestData);
		cancelBooking();
	};
	return (
		<li className='mb-3 border align-items-center list-group-item list-group-item-action flex-column align-items-start'>
			<div className='mb-2 d-flex w-100 justify-content-between align-items-center'>
				<h5 className='font-weight-bold' style={{ color: 'blue' }}>
					{booking.event.title}
				</h5>
				<button className='btn btn-sm btn-danger' onClick={handleCancel}>
					Cancel
				</button>
			</div>
			<p>{booking.event.description}</p>
			<hr />
			<p className='lead my-0'>
				Event scheduled on{' '}
				<small className='text-dark'>{formatDate(booking.event.date)}</small>
			</p>
			<p className='lead my-0'>
				Booked on{' '}
				<small className='text-dark'>{formatDate(booking.createdAt)}</small>
			</p>
		</li>
	);
};

BookingItem.propTypes = {
	booking: PropTypes.object.isRequired,
};

export default BookingItem;
