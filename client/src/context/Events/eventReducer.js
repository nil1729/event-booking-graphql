import { FETCH_EVENTS, FETCH_BOOKINGS } from "../utils/types";

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
    default:
      return state;
  }
};
