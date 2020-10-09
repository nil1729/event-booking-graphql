import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Layouts
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";

// Pages
import Authentication from "./components/pages/Auths";
import Events from "./components/pages/Events";
import Bookings from "./components/pages/Booking";

// Router
import PrivateRoute from "./components/routing/PrivateRoute";

// Context APIs
import EventContext from "./context/Events/eventContext";
import AuthContext from "./context/Auths/authContext";
import AlertContext from "./context/Alerts/alertContext";

// Main App
const App = () => {
  const eventContext = useContext(EventContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { msgs, showAlert } = alertContext;
  const { loadEvents, loadBookings, events, clearBookings } = eventContext;
  const {
    loadUser,
    isAuthenticated,
    loading: authLoading,
    token,
    logout,
    error: authError,
  } = authContext;

  useEffect(() => {
    if (authError && typeof authError !== "undefined") {
      showAlert("warning", authError);
    }
    if (isAuthenticated && !authLoading) {
      loadBookings();
    } else if (!events) {
      loadEvents();
    }
    if (token) {
      loadUser();
    } else {
      clearBookings();
      logout();
    }
    // eslint-disable-next-line
  }, [authLoading, isAuthenticated]);

  // Main Rendered Components
  return (
    <Router>
      <Navbar />
      {msgs && <Alert />}
      <Switch>
        <Route exact path="/auth" component={Authentication} />
        <Route exact path="/events" component={Events} />
        <PrivateRoute exact path="/bookings" component={Bookings} />
        <Redirect from="/" to="/events" />
      </Switch>
    </Router>
  );
};

export default App;
