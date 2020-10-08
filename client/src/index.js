import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

// Context API State
import AuthState from "./context/Auths/authState";
import EventState from "./context/Events/eventState";
import AlertState from "./context/Alerts/alertState";

ReactDOM.render(
  <AuthState>
    <EventState>
      <AlertState>
        <App />
      </AlertState>
    </EventState>
  </AuthState>,
  document.getElementById("root")
);
