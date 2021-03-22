import { combineReducers, createStore } from "redux";
import SignUpReducer from "./SignUpReducer";

let reducers = combineReducers({
    SignUpReducer : SignUpReducer,
})

let store = createStore(reducers);

export default store;