const SHOW_NAVBAR = "SHOW_NAVBAR"
const HIDE_NAVBAR = "HIDE_NAVBAR"

export const setNavbarAC = (isShowNavbar) => {
  return {
    type: isShowNavbar,
  }
}

const navbarReducer = (state = true, action) => {
  switch (action.type) {
    case SHOW_NAVBAR:
      return { ...state, showNavbar: true }
    case HIDE_NAVBAR:
      return { ...state, showNavbar: false }

    default:
      return state
  }
}
export default navbarReducer
