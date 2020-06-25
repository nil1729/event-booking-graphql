import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext.js';
import Modal from '../Modal';
import ListItem from '../ListItem';
import Progress from '../Progress';
const Events = () => {
	const authContext = useContext(AuthContext);
	const { token } = authContext;
	const [modalShow, setModalShow] = useState(false);
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const closeModal = () => {
		setModalShow(false);
		sendRequest(requestData);
	};
	const sendRequest = async requestData => {
		setLoading(true);
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
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
		setEvents(JSONData.data.events);
		setLoading(false);
	};
	const requestData = {
		query: `
			query {
				events {
					_id
					title
					description
					date
					price
					creator {
						email
					}
				}
			}
		`,
	};
	useEffect(() => {
		sendRequest(requestData);
		// eslint-disable-next-line
	}, []);
	return (
		<div className='container'>
			<div className='jumbotron text-center'>
				<h2>Share your own Events</h2>
				{token && (
					<button
						className='btn btn-danger'
						onClick={() => setModalShow(!modalShow)}>
						Create Event
					</button>
				)}
			</div>
			{modalShow && <Modal closeModal={closeModal} />}
			<div className='container mb-4'>
				<h4 className='text-center'>List of All Events</h4>
				<div className='list-group'>
					{loading ? (
						<Progress />
					) : (
						events.map(event => <ListItem key={event._id} data={event} />)
					)}
				</div>
			</div>
		</div>
	);
};

export default Events;
