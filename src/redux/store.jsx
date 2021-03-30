import { combineReducers, createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import user from "./auth/user"
import vocabulary from "./vocabulary/vocabulary"
import settings from "./settings/settings"
import pagination from "./pagination/pagination"
import wordBook from "./wordBook/wordBook"
import wordBookWords from "./wordBook/wordBookWords"

const reducers = combineReducers({
  user,
  vocabulary,
  wordBookWords,
  settings,
  pagination,
  wordBook,
})

const middlewares = [thunk, logger]
export default function configureStore(initialState = {}) {
  return createStore(reducers, initialState, applyMiddleware(...middlewares))
}
