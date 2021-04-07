import axios from "axios"
import { changePagesCount } from "../pagination/pagination"

export const FETCH_VOCABULARY_REQUEST = "FETCH_VOCABULARY_REQUEST"
export const FETCH_VOCABULARY_SUCSESS = "FETCH_VOCABULARY_SUCSESS"
export const FETCH_VOCABULARY_FAILURE = "FETCH_VOCABULARY_FAILURE"
export const FETCH_VOCABULARY_COUNT = "FETCH_VOCABULARY_COUNT"

const initialState = {
  vocabulary: null,
  isLoading: false,
}

const VocabularyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VOCABULARY_REQUEST:
      return { ...state, isLoading: true, vocabulary: null, error: "" }
    case FETCH_VOCABULARY_SUCSESS:
      return {
        ...state,
        isLoading: false,
        vocabulary: action.payload,
        error: "",
      }
    case FETCH_VOCABULARY_COUNT:
      return {
        ...state,
        counter: action.payload,
      }
    case FETCH_VOCABULARY_FAILURE:
      return {
        ...state,
        isLoading: false,
        vocabulary: null,
        error: action.payload,
      }
    default:
      return state
  }
}

export const fetchVocabularyRequest = () => ({ type: FETCH_VOCABULARY_REQUEST })

export const fetchCountSucsess = (data) => ({
  type: FETCH_VOCABULARY_COUNT,
  payload: data,
})
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
    .then(({ data }) => {
      dispatch(changePagesCount(30))
      dispatch(fetchVocabularySucsess(data))
    })
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
      dispatch(changePagesCount(Math.ceil(data[0]?.totalCount[0]?.count / 20)))
      return dispatch(fetchVocabularySucsess(result))
    })
    .catch((error) => dispatch(fetchVocabularyFailure(error)))
}
export const getCounterUser = (queryDifficulty) => (dispatch) => {
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
    .then(({ data }) => {
      const result = data[0].totalCount[0]?.count
      return dispatch(fetchCountSucsess(result))
    })
}

export default VocabularyReducer
