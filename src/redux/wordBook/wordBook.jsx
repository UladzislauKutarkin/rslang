import axios from "axios"

export const ADD_USER_WORD = "ADD_USER_WORD"
export const DELETE_USER_WORD = "DELETE_USER_WORD"
export const GET_USER_WORD = "GET_USER_WORD"

const initialState = {
  wordBook: [],
  pageSize: 20,
}

const wordBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_WORD:
      return { ...state, wordBook: action.payload }
    case GET_USER_WORD:
      return { ...state, wordBook: action.payload }
    case DELETE_USER_WORD:
      return { ...state, pageSize: action.payload }
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
export const getUsersWords = (page, queryDifficulty) => (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("user"))
  const { userID } = JSON.parse(localStorage.getItem("user"))
  axios
    .get(
      `users/${userID}/aggregatedWords?wordsPerPage=3600&page=${page}&filter={"userWord.difficulty":"${queryDifficulty}"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => dispatch(fetchUserWordsSucsess(data)))
}

export const addWordToWordBook = (wordId, difficulty) => (dispatch) => {
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
    .then(({ data }) => dispatch(AddUserWord(data)))
}

export default wordBookReducer
