import axios from "axios"

export const ADD_USER_WORD = "ADD_USER_WORD"
export const DELETE_USER_WORD = "DELETE_USER_WORD"

const initialState = {
  wordBook: {},
  pageSize: 20,
}

const wordBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_WORD:
      return { ...state, wordBook: action.payload }
    case DELETE_USER_WORD:
      return { ...state, pageSize: action.payload }
    default:
      return state
  }
}

export const AddUserWord = (mode) => ({
  type: ADD_USER_WORD,
  payload: mode,
})

export const addWordToWordBook = (wordId) => (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("user"))
  const { userID } = JSON.parse(localStorage.getItem("user"))
  axios
    .post(
      `/users/${userID}/words/${wordId}`,
      {},
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
