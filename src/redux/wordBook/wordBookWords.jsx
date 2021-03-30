import axios from "axios"

export const FETCH_USER_VOCABULARY_SUCSESS = "FETCH_USER_VOCABULARY_SUCSESS"
export const FETCH_USER_VOCABULARY_FAILURE = "FETCH_USER_VOCABULARY_FAILURE"

const initialState = {
  userVocabulary: [],
  pageSize: 20,
  isLoading: false,
}

const userVocabularyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_VOCABULARY_SUCSESS:
      return {
        ...state,
        isLoading: false,
        userVocabulary: [
          ...state.userVocabulary.filter(
            (userVocabul) => userVocabul.id !== action.payload.id
          ),
          action.payload,
        ],
        error: "",
      }
    case FETCH_USER_VOCABULARY_FAILURE:
      return {
        ...state,
        isLoading: false,
        userVocabulary: {},
        error: action.payload,
      }
    default:
      return state
  }
}

export const fetchUserVocabularySucsess = (data) => ({
  type: FETCH_USER_VOCABULARY_SUCSESS,
  payload: data,
})
export const fetchUserVocabularyFailure = (error) => ({
  type: FETCH_USER_VOCABULARY_FAILURE,
  payload: error.message,
})

export const getUserVocabulary = (wordId) => (dispatch) => {
  axios
    .get(`/words/${wordId}`)
    .then(({ data }) => dispatch(fetchUserVocabularySucsess(data)))
    .catch((error) => dispatch(fetchUserVocabularyFailure(error)))
}
export default userVocabularyReducer
