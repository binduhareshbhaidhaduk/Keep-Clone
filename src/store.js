import { createStore ,applyMiddleware, compose} from '@reduxjs/toolkit';
import rootReducer from './Services/Reducer';
import { thunk } from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);
export const store = createStore(rootReducer, enhancer);