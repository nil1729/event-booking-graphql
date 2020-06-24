import React from 'react';
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

const App = () => {
	return (
		<Router>
			<>
				<Navbar />
				<Switch>
					<Route exact path='/auth' component={Authentication} />
					<Route exact path='/events' component={Events} />
					<Route exact path='/bookings' component={Bookings} />
				</Switch>
			</>
		</Router>
	);
};

export default App;
