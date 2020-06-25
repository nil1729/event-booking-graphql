import React, { useContext } from 'react';
import AlertContext from '../context/AlertContext.js';

const Alert = () => {
	const alertContext = useContext(AlertContext);
	const { type, msgs } = alertContext;
	return (
		msgs && (
			<div className={`alert alert-dismissible alert-${type} py-2`}>
				{msgs.map(err => (
					<p key={err.message} className='lead m-0 text-dark'>
						{err.message}
					</p>
				))}
			</div>
		)
	);
};

export default Alert;
