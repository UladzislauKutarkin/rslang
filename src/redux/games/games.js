import backEnd from "../../api/heroku_back"

const GET_WORDS = "GET_WORDS"

export const getWordsPageAC = (group = 0, page = 1) => async (dispatch) => {
  const res = await backEnd.get(`/words/?group=${group}&page=${page}`)
  dispatch({ type: GET_WORDS, payload: res.data })
}

const pageOfWordsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_WORDS":
      return { ...state, wordsPage: action.payload }

    default:
      return state
  }
}
export default pageOfWordsReducer
