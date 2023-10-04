// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

// Reducer
const initialState = {
  greeting: null,
  loading: false,
  error: null,
};

const greetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_GREETING_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_GREETING_SUCCESS':
      return { ...state, loading: false, greeting: action.payload };
    case 'FETCH_GREETING_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  greeting: greetingReducer,
});

// Actions
const fetchGreetingRequest = () => ({
  type: 'FETCH_GREETING_REQUEST',
});

const fetchGreetingSuccess = (greeting) => ({
  type: 'FETCH_GREETING_SUCCESS',
  payload: greeting,
});

const fetchGreetingFailure = (error) => ({
  type: 'FETCH_GREETING_FAILURE',
  payload: error,
});

export const fetchRandomGreeting = () => (dispatch) => {
  dispatch(fetchGreetingRequest());
  axios
    .get('http://localhost:3000/greetings/random') // Replace with your API endpoint
    .then((response) => {
      dispatch(fetchGreetingSuccess(response.data.message));
    })
    .catch((error) => {
      dispatch(fetchGreetingFailure(error.message));
    });
};

// Create store with Thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
