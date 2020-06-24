import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
			<span className='navbar-brand'>GraphQL Events</span>
			<div className='collapse navbar-collapse' id='navbarColor01'>
				<ul className='navbar-nav mr-auto'>
					<li className='nav-item'>
						<Link className='nav-link' to='/auth'>
							Authentication
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/events'>
							Events
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/bookings'>
							Bookings
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
