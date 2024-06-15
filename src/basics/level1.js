import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

// Action types
const init = "account/init";
const inc = "account/increment";
const dec = "account/decrement";
const incByAm = 'account/incrementByAmount';
const addBonus = 'bonus/addBonus';
const fetchPending = 'account/fetchDataPending';
const fetchFulfilled = 'account/fetchDataFulfilled';
const fetchError = 'account/fetchDataError';

// Reducers
function reducer1(state = { amount: 1, status: 'idle', error: null }, action) {
    switch (action.type) {
        case inc:
            return { ...state, amount: state.amount + 1 };
        case dec:
            return { ...state, amount: state.amount - 1 };
        case incByAm:
            return { ...state, amount: state.amount + action.payload };
        case init:
            return { ...state, amount: action.payload };
        case fetchPending:
            return { ...state, status: 'pending', error: null };
        case fetchFulfilled:
            return { ...state, status: 'fulfilled', amount: action.payload };
        case fetchError:
            return { ...state, status: 'error', error: action.payload };
        default:
            return state;
    }
}

function reducer2(state = { bonus: 0 }, action) {
    switch (action.type) {
        case addBonus:
            return { bonus: state.bonus + action.payload };
        default:
            return state;
    }
}

// Combine reducers
const rootReducer = combineReducers({
    account: reducer1,
    bonus: reducer2
});

// Store
const store = createStore(rootReducer, applyMiddleware(thunk, logger.default));

// Global state
console.log(store.getState());

// Dispatch async action
store.dispatch(getData(1));
store.dispatch({ type: addBonus, payload: 500 });

// Async action creator
function getData(id) {
    return async function(dispatch) {
        dispatch(fetchDataPending());
        try {
            const response = await axios.get(`http://localhost:3000/accounts/${id}`);
            const data = response.data; // Parse the JSON from the response
            dispatch(fetchDataFulfilled(data.amount));
            console.log("data --- ", data);
        } catch (error) {
            dispatch(fetchDataError(error.message));
            console.error('There was a problem with the axios operation:', error);
        }
    };
}

// Action creators
function fetchDataPending() {
    return { type: fetchPending };
}

function fetchDataFulfilled(value) {
    return { type: fetchFulfilled, payload: value };
}

function fetchDataError(error) {
    return { type: fetchError, payload: error };
}

function userData(value) {
    return { type: init, payload: value };
}

// function addBonus(value) {
//     return { type: addBonus, payload: value };
// }
