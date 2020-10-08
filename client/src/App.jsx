import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//! Components
import Navbar from "./components/Navbar";
import Authentication from "./components/pages/Auths";
import Events from "./components/pages/Events";
import Bookings from "./components/pages/Booking";

import PrivateRoute from "./components/routing/PrivateRoute";

//! Context APIs
import AuthContext from "./context/AuthContext.js";
import AlertState from "./context/AlertState.js";
import EventContext from "./context/EventContext.js";

const App = () => {
  const [auth, setAuth] = useState({
    token: null,
    userID: null,
    isAuth: null,
  });
  const [authLoading, setLoading] = useState(true);
  const [events, setEvents] = useState(null);
  const [bookings, setBookings] = useState(null);
  const login = async (authData) => {
    localStorage.setItem("AuthData", JSON.stringify(authData));
    await loadBookings(authData.token);
    setAuth({
      ...auth,
      token: authData.token,
      userID: authData.userID,
      isAuth: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("AuthData");
    setAuth({
      ...auth,
      token: null,
      userID: null,
      isAuth: null,
    });
  };
  const addEvent = (event) => {
    setEvents([event, ...events]);
  };
  const addBooking = (booking) => {
    setBookings([booking, ...bookings]);
  };
  const loadData = async () => {
    loadEvents();
    let authData = JSON.parse(localStorage.getItem("AuthData"));
    if (authData) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${authData.token}`);
      myHeaders.append("Content-Type", "application/json");
      const requestDate = {
        query: `
					query {
						validateAuth 
					}
				`,
      };
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(requestDate),
        redirect: "follow",
      };
      const response = await fetch("/graphql", requestOptions);
      const JSONData = await response.json();
      if (JSONData.data.validateAuth) {
        login(authData);
        setLoading(false);
        return true;
      } else {
        logout();
        setLoading(false);
        return false;
      }
    }
    setLoading(false);
  };
  const sendRequest = async (requestData, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestData),
      redirect: "follow",
    };
    const response = await fetch("/graphql", requestOptions);
    const JSONData = await response.json();
    return JSONData;
  };
  const loadEvents = async () => {
    const requestData = {
      query: `
				query {
					events {
						_id
						title
						description
						date
						price
						creator {
							_id
						}
					}
				}
			`,
    };
    const res = await sendRequest(requestData);
    setEvents(res.data.events);
  };
  const loadBookings = async (token) => {
    const requestData = {
      query: `
				query {
					bookings {
						_id
						event {
							title
							description
							date
							price
						}
						user {
							email
						}
						createdAt
					}
				}
			`,
    };
    const res = await sendRequest(requestData, token);
    setBookings(res.data.bookings);
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
            authLoading: authLoading,
            isAuth: auth.isAuth,
            login: login,
            logout: logout,
            validateAuth: loadData,
          }}
        >
          <EventContext.Provider
            value={{
              Events: events,
              Bookings: bookings,
              addEvent: addEvent,
              addBooking: addBooking,
            }}
          >
            <AlertState>
              <Navbar />
              <Switch>
                <Route exact path="/auth" component={Authentication} />
                <Route exact path="/events" component={Events} />
                <PrivateRoute exact path="/bookings" component={Bookings} />
              </Switch>
            </AlertState>
          </EventContext.Provider>
        </AuthContext.Provider>
      </>
    </Router>
  );
};

export default App;
