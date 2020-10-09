import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducers";

import {
  LOGIN_USER,
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERROR,
} from "../utils/types";
import sendRequest from "../utils/sendRequest";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem("authCredentials")
      ? JSON.parse(localStorage.getItem("authCredentials")).token
      : null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const responseData = async (modeLogin, email, password) => {
    let requestData = {
      query: ` 
              query {
                  loginUser(userInput: {email: "${email}", password: "${password}"}){
                    token
                    expiresIn
                    lastLogin
                  }
              }
            `,
    };
    if (!modeLogin) {
      requestData = {
        query: ` 
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}){
                      _id
                    }
                  }
                `,
      };
    }
    const res = await sendRequest(requestData);
    return res;
  };
  const authenticate = async (modeLogin, email, password) => {
    try {
      const res = await responseData(modeLogin, email, password);
      if (res.data && !res.errors) {
        if (modeLogin) {
          dispatch({
            type: LOGIN_USER,
            payload: res.data.loginUser,
          });
        }
      } else {
        return res.errors;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadUser = async (req, res) => {
    try {
      const requestData = {
        query: `
                query {
                  loadUser {
                    _id
                    email
                    createdEvents {
                      _id
                    }
                  }
                }     
            `,
      };
      const res = await sendRequest(requestData);
      if (res.data && !res.errors) {
        dispatch({
          type: LOAD_USER,
          payload: res.data.loadUser,
        });
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: res.errors,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkSession = async () => {
    try {
      const sessionDuration = JSON.parse(
        localStorage.getItem("authCredentials")
      ).expiresIn;
      const lastLoginTime = JSON.parse(localStorage.getItem("authCredentials"))
        .lastLogin;
      const currentTime = Date.now();
      const timeout = lastLoginTime + sessionDuration - currentTime;
      if (timeout > 0) {
        return true;
      }
      dispatch({
        type: AUTH_ERROR,
        payload: [{ message: "Session Expired. Please Login again" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    return dispatch({
      type: LOGOUT,
    });
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        authenticate: authenticate,
        loadUser: loadUser,
        logout: logout,
        clearError: clearError,
        checkSession: checkSession,
      }}
    >
      {props.children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthState;
