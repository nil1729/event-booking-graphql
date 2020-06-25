import React from 'react';

const Progress = () => {
	return (
		<div className='progress' style={{ width: '75%', margin: 'auto' }}>
			<div
				className='progress-bar progress-bar-striped progress-bar-animated'
				role='progressbar'
				style={{ width: '100%' }}></div>
		</div>
	);
};

export default Progress;
