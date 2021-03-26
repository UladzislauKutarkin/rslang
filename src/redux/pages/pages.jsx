export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

const initialState = {
  page: { name: "Empty", showNavbar: false },
}

const PageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return { ...state, page: action.payload }
    default:
      return state
  }
}

export const setPageActionCreator = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
})

export default PageReducer
