import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, UPDATE_USER } from "./types";

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
        alert("Email already exists Dude");
      }
    })
    .catch(function(err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
      console.log(err.response);
      alert("Email already exists Dude");
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
      localStorage.setItem("balance", decoded.balance);
      // Set current user
      dispatch(setCurrentUser(decoded));
      console.log("after dispatch");
    })
    .catch(function(err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
//Override set log in jwt_decode(token)
export const overrideCurrentUser = userData => dispatch => {
    console.log("here");
    
    dispatch(overwriteLogin(userData));
};


//Overwrite logged in user
export const overwriteLogin = decoded => {
  console.log(decoded);
  decoded.user.balance = 20;
  console.log(UPDATE_USER);
  console.log("ay");
  
  return {
    type: UPDATE_USER,
    payload: decoded.user
  };
};


// Set logged in user
export const setCurrentUser = decoded => {
  console.log(decoded);
  console.log(SET_CURRENT_USER);
  console.log("ay");
  
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
  localStorage.removeItem("balance");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

