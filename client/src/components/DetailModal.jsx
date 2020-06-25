import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import AuthContext from '../context/AuthContext.js';

const DetailModal = ({ event, closeDetailModal }) => {
	const authContext = useContext(AuthContext);
	const { token } = authContext;
	const formattedDate = moment(event.date).format('Do MMM YYYY');
	const history = useHistory();
	const handleBook = () => {
		if (!token) {
			history.push('/auth');
		} else {
			console.log('Authentication successful');
		}
	};
	return (
		<div className='modal'>
			<div className='modal-dialog' role='document' style={{ top: '10%' }}>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5
							className='modal-title font-weight-bold'
							style={{ color: 'blue' }}>
							{event.title}
						</h5>
						<button type='button' className='close' onClick={closeDetailModal}>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='modal-body'>
						<p>{event.description}</p>
					</div>
					<div className='modal-footer'>
						<p className='lead mr-auto'>
							Price: ₹{event.price} -{' '}
							<small className='text-dark'>{formattedDate}</small>
						</p>
						<button
							onClick={handleBook}
							className='text-dark btn btn-sm btn-warning'>
							Book
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
DetailModal.propTypes = {
	event: PropTypes.object.isRequired,
	closeDetailModal: PropTypes.func.isRequired,
};

export default DetailModal;
