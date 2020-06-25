import React, { useState } from 'react';
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
		setAuth({
			...auth,
			token: authData.token,
			userID: authData.userID,
			tokenExpiresIn: authData.tokenExpiresIn,
		});
	};

	const logout = () => {
		setAuth({
			...auth,
			token: null,
			userID: null,
			tokenExpiresIn: null,
		});
	};

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
