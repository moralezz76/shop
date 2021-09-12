import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

// state on app start
const initialState = {};

// configure middleware
const middleware = [thunk];

// create store
const enhancer = compose(applyMiddleware(...middleware));
const store = createStore(rootReducer, initialState, enhancer);

// export store singleton instance
export default store;
