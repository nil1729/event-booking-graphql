import {
  FETCH_EVENTS,
  FETCH_BOOKINGS,
  BOOK_EVENT,
  CANCEL_BOOKING,
  CREATE_EVENT,
} from "../utils/types";

export default (state, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case FETCH_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
      };
    case BOOK_EVENT:
      return {
        ...state,
        bookings: [action.payload, ...state.bookings],
      };
    case CANCEL_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking._id !== action.payload
        ),
      };
    case CREATE_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };
    default:
      return state;
  }
};
