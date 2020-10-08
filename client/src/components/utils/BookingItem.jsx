import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import EventContext from "../../context/Events/eventContext";

const BookingItem = ({ booking }) => {
  const formatDate = (date) => {
    return moment(date).format("Do MMM YYYY hh:mm a");
  };

  const eventContext = useContext(EventContext);

  const { cancelBooking } = eventContext;

  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    setCancelling(true);
    await cancelBooking(booking._id);
  };

  return (
    <li className="mb-3 list__item border align-items-center list-group-item list-group-item-action flex-column align-items-start">
      <div className="list__item__header mb-2 d-flex w-100 justify-content-between align-items-center">
        <h5 className=" font-weight-bold" style={{ color: "blue" }}>
          {booking.event.title}
        </h5>
        <button
          disabled={cancelling}
          className="btn btn-sm btn-danger"
          onClick={handleCancel}
        >
          {cancelling ? "Cancelling ..." : "Cancel"}
        </button>
      </div>
      <p className="list__item__desc">{booking.event.description}</p>
      <hr />
      <p className="lead my-0">
        Event scheduled on{" "}
        <small className="text-dark">{formatDate(booking.event.date)}</small>
      </p>
      <p className="lead my-0">
        Booked on{" "}
        <small className="text-dark">{formatDate(booking.createdAt)}</small>
      </p>
    </li>
  );
};

BookingItem.propTypes = {
  booking: PropTypes.object.isRequired,
};

export default BookingItem;
