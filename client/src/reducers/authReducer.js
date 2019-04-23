import { SET_CURRENT_USER, USER_LOADING, UPDATE_USER} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  console.log("got this far", action);

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_USER:{
       console.log("updated user", action.payload);
      return {...state, user: {...state.user, ...action.payload}}
      }
   default:
      return state;
  }
}
