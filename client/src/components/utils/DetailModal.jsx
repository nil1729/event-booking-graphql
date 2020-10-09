import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import AuthContext from "../../context/Auths/authContext";
import EventContext from "../../context/Events/eventContext";

const DetailModal = ({ event, closeDetailModal }) => {
  const authContext = useContext(AuthContext);
  const eventContext = useContext(EventContext);
  const { bookEvent, bookings } = eventContext;
  const { isAuthenticated } = authContext;
  const formattedDate = moment(event.date).format("Do MMM YYYY");
  const history = useHistory();

  const [booking, setBooking] = useState(false);

  const handleBook = async () => {
    setBooking(true);
    if (!isAuthenticated) {
      history.push("/auth");
    } else {
      await bookEvent(event._id);
      setBooking(false);
      history.push("/bookings");
    }
  };

  const alreadyBooked = () => {
    let bookedTest = bookings.filter(
      (booking) => booking.event._id === event._id
    );
    if (bookedTest.length > 0) {
      return true;
    }
    return false;
  };
  return (
    <div className="modal">
      <div className="modal-dialog" role="document" style={{ top: "10%" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title font-weight-bold"
              style={{ color: "blue" }}
            >
              {event.title}
            </h5>
            <button type="button" className="close" onClick={closeDetailModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{event.description}</p>
          </div>
          <div className="modal-footer">
            <p className="lead mr-auto">
              Price: ₹{event.price} -{" "}
              <small className="text-dark">{formattedDate}</small>
            </p>
            {isAuthenticated && alreadyBooked() ? (
              <button disabled className="text-dark btn btn-sm btn-warning">
                Already Booked
              </button>
            ) : (
              <button
                disabled={booking}
                onClick={handleBook}
                className="text-dark btn btn-sm btn-warning"
              >
                {booking ? "Booking ..." : "Book"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
DetailModal.propTypes = {
  event: PropTypes.object.isRequired,
  closeDetailModal: PropTypes.func.isRequired,
};

export default DetailModal;
