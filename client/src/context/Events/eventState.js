import React, { useReducer } from "react";
import EventReducer from "./eventReducer";
import EventContext from "./eventContext";
import sendRequest from "../utils/sendRequest";

import {
  FETCH_EVENTS,
  FETCH_BOOKINGS,
  BOOK_EVENT,
  CANCEL_BOOKING,
  CREATE_EVENT,
  CLEAR_BOOKINGS,
} from "../utils/types";

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
                  _id
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

  const bookEvent = async (eventID) => {
    try {
      const requestData = {
        query: `
                  mutation {
                    bookEvent (eventID: "${eventID}") {
                      _id
                      event {
                        _id
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
          type: BOOK_EVENT,
          payload: res.data.bookEvent,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancelBooking = async (bookingID) => {
    try {
      const requestData = {
        query: `
            mutation {
              cancelBooking(bookingID: "${bookingID}") {
                _id
              }
            }
        `,
      };
      const res = await sendRequest(requestData);
      if (res.data && !res.errors) {
        dispatch({
          type: CANCEL_BOOKING,
          payload: bookingID,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createEvent = async (title, description, price, date) => {
    try {
      const requestData = {
        query: `
                mutation {
                    createEvent (eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
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
      if (res.data && !res.errors) {
        dispatch({
          type: CREATE_EVENT,
          payload: res.data.createEvent,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearBookings = () => {
    dispatch({
      type: CLEAR_BOOKINGS,
    });
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
        bookEvent: bookEvent,
        cancelBooking: cancelBooking,
        createEvent: createEvent,
        clearBookings: clearBookings,
      }}
    >
      {props.children}{" "}
    </EventContext.Provider>
  );
};
export default EventState;
