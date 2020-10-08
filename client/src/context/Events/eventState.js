import React, { useReducer } from "react";
import EventReducer from "./eventReducer";
import EventContext from "./eventContext";
import sendRequest from "../utils/sendRequest";

import { FETCH_EVENTS, FETCH_BOOKINGS } from "../utils/types";

const EventState = (props) => {
  const initialState = {
    events: null,
    loading: false,
    bookings: null,
    error: null,
  };

  const [state, dispatch] = useReducer(EventReducer, initialState);

  const loadEvents = async () => {
    try {
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
      dispatch({
        type: FETCH_EVENTS,
        payload: res.data.events,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loadBookings = async () => {
    try {
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
      const res = await sendRequest(requestData);
      if (res.data && !res.errors) {
        dispatch({
          type: FETCH_BOOKINGS,
          payload: res.data.bookings,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        loading: state.loading,
        bookings: state.bookings,
        error: state.error,
        loadEvents: loadEvents,
        loadBookings: loadBookings,
      }}
    >
      {props.children}{" "}
    </EventContext.Provider>
  );
};
export default EventState;
