import { combineReducers, createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import user from "./auth/user"
import vocabulary from "./vocabulary/vocabulary"
import settings from "./settings/settings"
import pagination from "./pagination/pagination"
// import page from "./pages/pages"
import wordsPage from "./games/games"
import showNavbar from "./games/navbar"

import wordBook from "./wordBook/wordBook"

const reducers = combineReducers({
  user,
  vocabulary,
  settings,
  pagination,
  wordsPage,
  showNavbar,
  wordBook,
})

const middlewares = [thunk, logger]
export default function configureStore(initialState = {}) {
  return createStore(reducers, initialState, applyMiddleware(...middlewares))
}
