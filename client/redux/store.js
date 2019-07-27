import { createStore, applyMiddleware } from 'redux';
import actions from './actions';

const {
  types: { SET_PASSWORD, SET_USER, SET_USERNAME },
} = actions;

const initialState = {
  password: '',
  username: '',
  user: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

const loggingMiddleware = store => next => action => {
  console.log('Current State: ', store.getState());
  const nextState = next(action);
  console.log('Next State: ', store.getState());
  return nextState;
};

const reduxThunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  return next(action);
};

const store = createStore(rootReducer, applyMiddleware(loggingMiddleware, reduxThunk));

export default store;
