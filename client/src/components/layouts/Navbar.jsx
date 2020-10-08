import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/Auths/authContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const mbStyle = () => {
    return {
      display: open ? "block" : "none",
    };
  };
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <span className="navbar-brand">GraphQL Events</span>
      <button
        onClick={() => setOpen(!open)}
        className="navbar-toggler"
        type="button"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" style={mbStyle()}>
        <ul className="navbar-nav ml-auto d-flex align-items-center">
          <li className="nav-item" onClick={() => setOpen(!open)}>
            <NavLink className="nav-link" to="/events">
              Events
            </NavLink>
          </li>

          {!isAuthenticated && !loading ? (
            <li className="nav-item" onClick={() => setOpen(!open)}>
              <NavLink className="nav-link" to="/auth">
                Authenticate
              </NavLink>
            </li>
          ) : (
            <>
              <li className="nav-item" onClick={() => setOpen(!open)}>
                <NavLink className="nav-link" to="/bookings">
                  Bookings
                </NavLink>
              </li>
              <li className="nav-item" onClick={() => setOpen(!open)}>
                <button
                  // onClick={logout}
                  className="btn btn-warning btn-sm text-dark"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
