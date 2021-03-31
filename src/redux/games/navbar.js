const SHOW_NAVBAR = "SHOW_NAVBAR"
const HIDE_NAVBAR = "HIDE_NAVBAR"

export const onNavbarAC = () => {
  return {
    type: SHOW_NAVBAR,
  }
}

export const offNavbarAC = () => {
  return {
    type: HIDE_NAVBAR,
  }
}

const navbarReducer = (state = { showNavbar: true }, action) => {
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
