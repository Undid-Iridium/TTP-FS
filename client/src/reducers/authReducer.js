import { SET_CURRENT_USER, USER_LOADING, UPDATE_USER} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  changeUser: {},
  loading: false
};

export default function(state = initialState, action) {
  
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        changeUser : action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_USER:
     
       return {

        ...state,
        user : state.user,
        isAuthenticated: !isEmpty(action.payload),
        changeUser : action.payload


      };
   default:
      return state;
  }
}
