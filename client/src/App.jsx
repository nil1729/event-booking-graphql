import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

//! Components
import Navbar from './components/Navbar';
import Authentication from './components/pages/Auths';
import Events from './components/pages/Events';
import Bookings from './components/pages/Booking';

//! Context APIs
import AuthContext from './context/AuthContext.js';

const App = () => {
	const [auth, setAuth] = useState({
		token: null,
		userID: null,
		tokenExpiresIn: null,
	});

	const login = authData => {
		localStorage.setItem('AuthData', JSON.stringify(authData));
		setAuth({
			...auth,
			token: authData.token,
			userID: authData.userID,
			tokenExpiresIn: authData.tokenExpiresIn,
		});
	};

	const logout = () => {
		localStorage.removeItem('AuthData');
		setAuth({
			...auth,
			token: null,
			userID: null,
			tokenExpiresIn: null,
		});
	};

	const loadData = () => {
		const authData = JSON.parse(localStorage.getItem('AuthData'));
		if (authData) {
			setAuth({
				...auth,
				token: authData.token,
				userID: authData.userID,
				tokenExpiresIn: authData.tokenExpiresIn,
			});
		}
	};
	useEffect(() => {
		loadData();
		// eslint-disable-next-line
	}, []);
	return (
		<Router>
			<>
				<AuthContext.Provider
					value={{
						token: auth.token,
						userID: auth.userID,
						tokenExpiresIn: auth.tokenExpiresIn,
						login: login,
						logout: logout,
					}}>
					<Navbar />
					<Switch>
						{auth.token && <Redirect from='/' to='/events' exact />}
						{auth.token && <Redirect from='/auth' to='/events' exact />}
						{!auth.token && (
							<Route exact path='/auth' component={Authentication} />
						)}
						<Route exact path='/events' component={Events} />
						{auth.token && (
							<Route exact path='/bookings' component={Bookings} />
						)}
						{!auth.token && <Redirect to='/auth' exact />}
					</Switch>
				</AuthContext.Provider>
			</>
		</Router>
	);
};

export default App;
