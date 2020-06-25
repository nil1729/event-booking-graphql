import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext.js';
import EventContext from '../../context/EventContext.js';
import Modal from '../Modal';
import ListItem from '../ListItem';
import Progress from '../Progress';
import DetailModal from '../DetailModal';

const Events = () => {
	const authContext = useContext(AuthContext);
	const eventContext = useContext(EventContext);
	const { token } = authContext;
	const { Events, addEvent, addBooking } = eventContext;
	const [modalShow, setModalShow] = useState(false);
	const [detailModalShow, setDetailModalShow] = useState(false);
	const [events, setEvents] = useState(Events);
	const [current, setCurrent] = useState({});
	const closeModal = data => {
		if (data._id) {
			addEvent(data);
		}
		setModalShow(false);
	};
	useEffect(() => {
		setEvents(Events);
		// eslint-disable-next-line
	}, [Events]);
	const openDeatilModal = event => {
		setCurrent(event);
		setDetailModalShow(true);
	};
	const closeDetailModal = data => {
		if (data._id) {
			addBooking(data);
		}
		setDetailModalShow(false);
	};
	return (
		<div className='container'>
			<div className='jumbotron text-center'>
				<h2 className='event__heading'>Share your own Events</h2>
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
					{!events ? (
						<Progress />
					) : events.length === 0 ? (
						<p className='lead text-danger text-center'>No Events Found</p>
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
