import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import AuthContext from "../../context/Auths/authContext";

const ListItem = ({ data, openDeatilModal }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const formattedDate = moment(data.date).format("Do MMM YYYY");
  return (
    <li className="list__item mb-2 border list-group-item list-group-item-action flex-column align-items-start">
      <div className="list__item__header mb-2 d-flex w-100 justify-content-between align-items-center">
        <h5 className="font-weight-bold" style={{ color: "blue" }}>
          {data.title}
        </h5>
        {user && user._id === data.creator._id ? (
          <p className="lead text-dark">You are the owner of this Event</p>
        ) : (
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              openDeatilModal(data);
            }}
          >
            View Details
          </button>
        )}
      </div>
      {user && user._id === data.creator._id ? (
        <p className="mb-1 list__item__desc">{data.description}</p>
      ) : (
        <></>
      )}
      <p className="lead">
        Price: ₹{data.price} -{" "}
        <small className="text-dark">{formattedDate}</small>
      </p>
    </li>
  );
};

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
  openDeatilModal: PropTypes.func.isRequired,
};

export default ListItem;
