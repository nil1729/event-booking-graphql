import React, { useState, useEffect, useContext } from "react";
import Progress from "../utils/Progress";
import EventContext from "../../context/Events/eventContext";
import BookingItem from "../utils/BookingItem";
import Charts from "../utils/Charts";

const Bookings = () => {
  const [tab, setTab] = useState("list");
  const eventContext = useContext(EventContext);
  const { bookings } = eventContext;

  return (
    <div className="container">
      <ul className="nav nav-tabs mt-2 mb-3">
        <li className="nav-item mr-1">
          <a
            onClick={() => {
              setTab("list");
            }}
            className={`nav-link ${tab === "list" ? "active" : ""}`}
          >
            <p className="lead">Bookings List</p>
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => {
              setTab("chart");
            }}
            className={`nav-link ${tab !== "list" ? "active" : ""}`}
          >
            <p className="lead">Bookings Chart</p>
          </a>
        </li>
      </ul>
      {tab === "list" ? (
        <>
          <div className="jumbotron py-2">
            <h2 className="text-center">Your Bookings</h2>
          </div>
          <div className="container px-2">
            <div className="list-group">
              {!bookings ? (
                <Progress />
              ) : bookings.length === 0 ? (
                <p className="lead text-center">You don't have Any Bookings</p>
              ) : (
                bookings.map((booking) => (
                  <BookingItem key={booking._id} booking={booking} />
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        <Charts />
      )}
    </div>
  );
};

export default Bookings;
