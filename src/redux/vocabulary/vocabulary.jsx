import axios from "axios"

export const FETCH_VOCABULARY_REQUEST = "FETCH_VOCABULARY_REQUEST"
export const FETCH_VOCABULARY_SUCSESS = "FETCH_VOCABULARY_SUCSESS"
export const FETCH_VOCABULARY_FAILURE = "FETCH_VOCABULARY_FAILURE"

const initialState = {
  vocabulary: [],
  pageSize: 20,
  currentPage: 1,
  isLoading: false,
  dataFetched: false,
}

const VocabularyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VOCABULARY_REQUEST:
      return { ...state, isLoading: true, vocabulary: {}, error: "" }
    case FETCH_VOCABULARY_SUCSESS:
      return {
        ...state,
        isLoading: false,
        vocabulary: action.payload,
        error: "",
      }
    case FETCH_VOCABULARY_FAILURE:
      return {
        ...state,
        isLoading: false,
        vocabulary: {},
        error: action.payload,
      }
    default:
      return state
  }
}

export const fetchVocabularyRequest = () => ({ type: FETCH_VOCABULARY_REQUEST })
export const fetchVocabularySucsess = (data) => ({
  type: FETCH_VOCABULARY_SUCSESS,
  payload: data,
})
export const fetchVocabularyFailure = (error) => ({
  type: FETCH_VOCABULARY_FAILURE,
  payload: error.message,
})

export const getVocabulary = (page, group) => (dispatch) => {
  axios
    .get(`https://rs-lang-back.herokuapp.com/words?page=${page}&group=${group}`)
    .then(({ data }) => dispatch(fetchVocabularySucsess(data)))
    .catch((error) => dispatch(fetchVocabularyFailure(error)))
}

export const getUserWordsVocabulary = (page, group) => (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("user"))
  const { userID } = JSON.parse(localStorage.getItem("user"))
  axios
    .get(
      `/users/${userID}/aggregatedWords?wordsPerPage=20&page=${page}&group=${group}&filter=%7B%22$or%22:[%7B%22userWord.difficulty%22:%22hard%22%7D,%7B%22userWord%22:null%7D]%7D`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => {
      const result = data[0].paginatedResults.map((item) => ({
        // eslint-disable-next-line no-underscore-dangle
        id: item._id,
        ...item,
      }))
      return dispatch(fetchVocabularySucsess(result))
    })
    .catch((error) => dispatch(fetchVocabularyFailure(error)))
}
export default VocabularyReducer
