import axios from "axios"
import { getUserWordsVocabulary } from "../vocabulary/vocabulary"

export const ADD_USER_WORD = "ADD_USER_WORD"
export const DELETE_USER_WORD = "DELETE_USER_WORD"
export const GET_USER_WORD = "GET_USER_WORD"
export const RESTORE_USER_WORD = "RESTORE_USER_WORD"
export const STUDIED_USER_WORD = "STUDIED_USER_WORD"

const initialState = {
  wordBook: [],
  deletedCounter: 0,
  hardWordCounter: 0,
}

const wordBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_WORD:
      return { ...state, wordBook: action.payload }
    case GET_USER_WORD:
      return { ...state, wordBook: action.payload }
    case STUDIED_USER_WORD:
      return { ...state, wordBook: action.payload }
    case DELETE_USER_WORD:
      return { ...state, wordBook: action.payload }
    case RESTORE_USER_WORD:
      return { ...state }
    default:
      return state
  }
}
export const fetchUserWordsSucsess = (data) => ({
  type: GET_USER_WORD,
  payload: data,
})
export const AddUserWord = (mode) => ({
  type: ADD_USER_WORD,
  payload: mode,
})
export const RestoreUserWord = (mode) => {
  return {
    type: RESTORE_USER_WORD,
    payload: mode,
  }
}

export const getUsersWords = (page, queryDifficulty, group) => (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("user"))
  const { userID } = JSON.parse(localStorage.getItem("user"))
  axios
    .get(
      `users/${userID}/aggregatedWords?wordsPerPage=20&page=${page}&group=${group}&filter={"userWord.difficulty":"${queryDifficulty}"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => dispatch(fetchUserWordsSucsess(data)))
}

export const getStudied = (queryDifficulty) => (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("user"))
  const { userID } = JSON.parse(localStorage.getItem("user"))
  axios
    .get(
      `users/${userID}/aggregatedWords?wordsPerPage=20&filter={"userWord.difficulty":"${queryDifficulty}"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => dispatch(fetchUserWordsSucsess(data)))
}

export const addWordToWordBook = (wordId, difficulty, page, group) => (
  dispatch
) => {
  const { token } = JSON.parse(localStorage.getItem("user"))
  const { userID } = JSON.parse(localStorage.getItem("user"))
  axios
    .post(
      `/users/${userID}/words/${wordId}`,
      { difficulty: `${difficulty}` },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then(() => dispatch(getUserWordsVocabulary(page, group)))
}

export const restoreWordBook = (wordId, page, queryDifficulty, group) => (
  dispatch
) => {
  const { token } = JSON.parse(localStorage.getItem("user"))
  const { userID } = JSON.parse(localStorage.getItem("user"))
  axios
    .delete(`/users/${userID}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(() => dispatch(getUsersWords(page, queryDifficulty, group)))
}

export default wordBookReducer
