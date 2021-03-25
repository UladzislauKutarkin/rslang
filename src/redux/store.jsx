import { combineReducers, createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import user from "./auth/user"
import vocabulary from "./vocabulary/vocabulary"
import settings from "./settings/settings"

const reducers = combineReducers({
  user,
  vocabulary,
  settings,
})

const middlewares = [thunk, logger]
export default function configureStore(initialState = {}) {
  return createStore(reducers, initialState, applyMiddleware(...middlewares))
}
