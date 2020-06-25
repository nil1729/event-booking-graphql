import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ data }) => {
	const formattedDate = new Date(data.date).toLocaleString();
	return (
		<li className='mb-2 border list-group-item list-group-item-action flex-column align-items-start'>
			<div className='d-flex w-100 justify-content-between'>
				<h5 className='mb-1 font-weight-bold text-danger'>{data.title}</h5>
				<small className='text-muted'>{formattedDate}</small>
			</div>
			<p className='mb-1'>{data.description}</p>
			<p className='text-muted font-weight-bold'>Price: ${data.price}</p>
		</li>
	);
};

ListItem.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ListItem;
