import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext.js';

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const { token, logout } = authContext;
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
			<span className='navbar-brand'>GraphQL Events</span>
			<div className='collapse navbar-collapse' id='navbarColor01'>
				<ul className='navbar-nav ml-auto d-flex align-items-center'>
					{!token && (
						<li className='nav-item'>
							<NavLink className='nav-link' to='/auth'>
								Authenticate
							</NavLink>
						</li>
					)}
					<li className='nav-item'>
						<NavLink className='nav-link' to='/events'>
							Events
						</NavLink>
					</li>
					{token && (
						<>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/bookings'>
									Bookings
								</NavLink>
							</li>
							<li className='nav-item'>
								<button
									onClick={logout}
									className='btn btn-warning btn-sm text-dark'>
									Logout
								</button>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
