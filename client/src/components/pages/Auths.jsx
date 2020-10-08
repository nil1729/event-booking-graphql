import React, { useState, useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../layouts/Alert";
import AuthContext from "../../context/Auths/authContext";
import AlertContext from "../../context/Alerts/alertContext";

const Authentication = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const history = useHistory();
  const { error, authenticate, isAuthenticated } = authContext;
  const { showAlert, msgs } = alertContext;
  const [modeLogin, setModeLogin] = useState(true);
  const emailEl = useRef();
  const passwordEl = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error && typeof error !== "undefined") {
      showAlert("warning", error);
    } else if (isAuthenticated) {
      history.push("/bookings");
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error]);

  const modeChange = () => {
    setModeLogin(!modeLogin);
  };

  const resetForm = () => {
    emailEl.current.value = "";
    passwordEl.current.value = "";
  };

  const submitHandle = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return setLoading(false);
    }
    resetForm();
    const errors = await authenticate(modeLogin, email, password);
    setLoading(false);
    if (!errors && !modeLogin) {
      showAlert("success", [
        { message: "Successfully Registered, Kindly Login now" },
      ]);
      setModeLogin(true);
      return;
    } else if (errors) {
      showAlert("warning", errors);
      return;
    }
    history.push("/bookings");
  };

  return (
    <div className="container mt-4">
      {msgs && <Alert />}
      <form
        className="auth__form"
        style={{ width: "60%", margin: "auto" }}
        onSubmit={submitHandle}
      >
        <h2 className="text-center">{modeLogin ? "Login" : "Register"} User</h2>
        <div className="form-group">
          <label>Email address</label>
          <input
            ref={emailEl}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            ref={passwordEl}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-sm btn-danger"
        >
          Submit
        </button>
        <button
          disabled={loading}
          type="button"
          className="btn btn-sm btn-warning ml-2 text-dark"
          onClick={modeChange}
        >
          Switch to {modeLogin ? "SignUp" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Authentication;
