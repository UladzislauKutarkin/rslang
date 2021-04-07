export const CHANGE_PAGE = "CHANGE_PAGE"
export const CHANGE_GROUP = "CHANGE_GROUP"
export const CHANGE_PAGES_COUNT = "CHANGE_PAGES_COUNT"

const initialState = {
  pageTextBook: +localStorage.getItem("pageTextBook") || 0,
  groupTextBook: +localStorage.getItem("groupTextBook") || 0,
  pageDeletedVocabulary: +localStorage.getItem("pageDeletedVocabulary") || 0,
  groupDeletedVocabulary: +localStorage.getItem("groupDeletedVocabulary") || 0,
  pageHardVocabulary: +localStorage.getItem("pageHardVocabulary") || 0,
  groupHardVocabulary: +localStorage.getItem("groupHardVocabulary") || 0,
  pageStudiedVocabulary: +localStorage.getItem("pageStudiedVocabulary") || 0,
  pagesCount: 0,
}

const PaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, [action.payload.type]: action.payload.page }
    case CHANGE_GROUP:
      return { ...state, [action.payload.type]: action.payload.group }
    case CHANGE_PAGES_COUNT:
      return { ...state, pagesCount: action.payload }
    default:
      return state
  }
}

export const changePage = (page, type) => ({
  type: CHANGE_PAGE,
  payload: { page, type },
})
export const changeGroup = (group, type) => ({
  type: CHANGE_GROUP,
  payload: { group, type },
})
export const changePagesCount = (count) => ({
  type: CHANGE_PAGES_COUNT,
  payload: count,
})

export default PaginationReducer
