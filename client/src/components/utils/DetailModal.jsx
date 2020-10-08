import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import AuthContext from "../../context/Auths/authContext";

const DetailModal = ({ event, closeDetailModal }) => {
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  const formattedDate = moment(event.date).format("Do MMM YYYY");
  const history = useHistory();

  const sendRequest = async (requestData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestData),
      redirect: "follow",
    };
    const res = await fetch("/graphql", requestOptions);
    const JSONData = await res.json();
    return JSONData.data.bookEvent;
  };
  const requestData = {
    query: `
            mutation {
                    bookEvent (eventID: "${event._id}") {
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
  const handleBook = async () => {
    if (!token) {
      history.push("/auth");
    } else {
      const res = await sendRequest(requestData);
      closeDetailModal(res);
      history.push("/bookings");
    }
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
            <button
              onClick={handleBook}
              className="text-dark btn btn-sm btn-warning"
            >
              Book
            </button>
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
