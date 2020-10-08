import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Layouts
import Navbar from "./components/layouts/Navbar";

// Pages
import Authentication from "./components/pages/Auths";
import Events from "./components/pages/Events";
import Bookings from "./components/pages/Booking";

// Router
import PrivateRoute from "./components/routing/PrivateRoute";

// Context APIs
import EventContext from "./context/Events/eventContext";
import AuthContext from "./context/Auths/authContext";

// Main App
const App = () => {
  const eventContext = useContext(EventContext);
  const authContext = useContext(AuthContext);

  const { loadEvents, loadBookings } = eventContext;
  const {
    loadUser,
    isAuthenticated,
    loading: authLoading,
    token,
  } = authContext;

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      loadBookings();
    } else {
      loadEvents();
    }
    if (token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, [authLoading, isAuthenticated]);

  // Main Rendered Components
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/auth" component={Authentication} />
        <Route exact path="/events" component={Events} />
        <PrivateRoute exact path="/bookings" component={Bookings} />
      </Switch>
    </Router>
  );
};

export default App;
