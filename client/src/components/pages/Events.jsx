import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext.js';
import Modal from '../Modal';
import ListItem from '../ListItem';
import Progress from '../Progress';
import DetailModal from '../DetailModal';

const Events = () => {
	const authContext = useContext(AuthContext);
	const { token } = authContext;
	const [modalShow, setModalShow] = useState(false);
	const [detailModalShow, setDetailModalShow] = useState(false);
	const [events, setEvents] = useState([]);
	const [current, setCurrent] = useState({});
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
						_id
					}
				}
			}
		`,
	};
	useEffect(() => {
		sendRequest(requestData);
		// eslint-disable-next-line
	}, []);
	const openDeatilModal = event => {
		setCurrent(event);
		setDetailModalShow(true);
	};
	const closeDetailModal = () => {
		setDetailModalShow(false);
	};
	return (
		<div className='container'>
			<div className='jumbotron text-center'>
				<h2>Share your own Events</h2>
				{token && (
					<button
						className='btn btn-sm btn-warning text-dark'
						onClick={() => setModalShow(!modalShow)}>
						Create Event
					</button>
				)}
			</div>
			{modalShow && <Modal closeModal={closeModal} />}
			{detailModalShow && (
				<DetailModal event={current} closeDetailModal={closeDetailModal} />
			)}
			<div className='container mb-4'>
				<h4 className='text-center'>List of All Events</h4>
				<div className='list-group'>
					{loading ? (
						<Progress />
					) : (
						events.map(event => (
							<ListItem
								key={event._id}
								data={event}
								openDeatilModal={openDeatilModal}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Events;
