export const CHANGE_PAGE = "CHANGE_PAGE"
export const CHANGE_GROUP = "CHANGE_GROUP"

const initialState = {
  page: 0 || +localStorage.getItem("page"),
  group: 0 || +localStorage.getItem("group"),
}

const PaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, page: action.payload }
    case CHANGE_GROUP:
      return { ...state, group: action.payload }
    default:
      return state
  }
}

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  payload: page,
})
export const changeGroup = (group) => ({
  type: CHANGE_GROUP,
  payload: group,
})

export default PaginationReducer
