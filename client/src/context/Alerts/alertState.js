import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducers";
import { SET_ALERT, REMOVE_ALERT } from "../utils/types";

const AlertState = (props) => {
  const initialState = {
    type: null,
    msgs: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const showAlert = (type, msgs) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        type,
        msgs,
      },
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
      });
    }, 5000);
  };
  return (
    <AlertContext.Provider
      value={{
        type: state.type,
        msgs: state.msgs,
        showAlert: showAlert,
      }}
    >
      {" "}
      {props.children}{" "}
    </AlertContext.Provider>
  );
};

export default AlertState;
