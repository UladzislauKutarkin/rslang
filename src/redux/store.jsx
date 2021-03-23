import { combineReducers, createStore, applyMiddleware } from "redux";
import user from "./auth/user";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    user,
})

const middlewares = [thunk,logger]
export default function configureStore(initialState = {}) {
    return createStore(reducers,initialState,applyMiddleware(...middlewares))
}


