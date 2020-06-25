import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext.js';

const Modal = ({ closeModal }) => {
	const d = new Date();
	const [today] = useState(
		`${d.getFullYear()}-${d.getMonth() + 1 < 10 ? 0 : ''}${d.getMonth() + 1}-${
			d.getDate() < 10 ? 0 : ''
		}${d.getDate()}`
	);
	const authContext = useContext(AuthContext);
	const { token } = authContext;
	const titleEl = useRef();
	const descEl = useRef();
	const dateEl = useRef();
	const priceEl = useRef();
	const sendRequest = async requestData => {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);
		myHeaders.append('Content-Type', 'application/json');
		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(requestData),
			redirect: 'follow',
		};
		const res = await fetch('http://localhost:5000/graphql', requestOptions);
		const JSONData = await res.json();
		return JSONData.data.createEvent;
	};
	const resetForm = () => {
		titleEl.current.value = '';
		descEl.current.value = '';
		priceEl.current.value = '';
		dateEl.current.value = `${today}T00:00`;
	};
	const handleSubmit = async e => {
		e.preventDefault();
		const title = titleEl.current.value;
		const description = descEl.current.value;
		const price = +priceEl.current.value;
		const date = dateEl.current.value;
		if (title.trim().length === 0 || description.trim().length === 0) {
			return;
		}
		if (price <= 0) {
			return;
		}
		const requestData = {
			query: `
                mutation {
                    createEvent (eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
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
		const res = await sendRequest(requestData);
		resetForm();
		closehandle(res);
	};
	const closehandle = data => {
		closeModal(data);
	};
	return (
		<div className='modal'>
			<div className='modal-dialog' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Add Event</h5>
						<button type='button' className='close' onClick={closehandle}>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='modal-body'>
						<form style={{ margin: 'auto' }} onSubmit={handleSubmit}>
							<div className='form-group'>
								<label>Title</label>
								<input
									type='text'
									ref={titleEl}
									className='form-control'
									placeholder='Enter Title here'
									required
								/>
							</div>
							<div className='form-group'>
								<label>Price</label>
								<input
									type='number'
									ref={priceEl}
									className='form-control'
									placeholder='Event Cost'
									min='0'
									required
								/>
							</div>
							<div className='form-group'>
								<label>Event Schedule</label>
								<input
									type='datetime-local'
									ref={dateEl}
									className='form-control'
									placeholder='Select Date to Schedule'
									defaultValue={`${today}T00:00`}
									min={`${today}T00:00`}
								/>
							</div>
							<div className='form-group'>
								<label>Event Description</label>
								<textarea
									ref={descEl}
									required
									className='form-control'
									rows='3'></textarea>
							</div>
							<button type='submit' className='btn btn-sm btn-primary'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default Modal;
