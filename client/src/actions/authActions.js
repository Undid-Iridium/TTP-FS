//import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_USER
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
    .then(function(res) {
      if (res.error === undefined) {
        history.push("/login");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.error
        });
        console.log(res.error);
        alert("Email already exists");
      }
    })
    .catch(function(err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
      console.log(err.response);
      alert("Email already exists");
    });
};

// Login - get user token AXIOS SUCKS   axios .post("/api/users/login", userData) (Randomly decided to stop posting data).
export const loginUser = userData => dispatch => {
  fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
    .then(res => {
      // Save to localStorage
      // Set token to localStorage

      const { token } = res;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      localStorage.setItem("state", JSON.stringify(decoded));
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(function(err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
//Override set log in jwt_decode(token)
export const setChangeUser = userData => dispatch => {
  dispatch(overwriteLogin(userData));
};

//Overwrite logged in user
export const overwriteLogin = decoded => {
  localStorage.setItem("state", JSON.stringify(decoded));
  return {
    type: UPDATE_USER,
    payload: decoded
  };
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("state");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

