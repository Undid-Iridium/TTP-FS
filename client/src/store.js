import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
//import { loadState } from './localStorage';
const initialState = {};

//const persistedState = loadState();

const middleware = [thunk];

const store = createStore(
 rootReducer,
 initialState,
 //persistedState,
 compose(
 applyMiddleware(...middleware),
 (window.__REDUX_DEVTOOLS_EXTENSION__ &&
 window.__REDUX_DEVTOOLS_EXTENSION__()) ||
 compose
 )
);

export default store;
