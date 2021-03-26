import axios from "axios"

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST"
export const FETCH_USER_SUCSESS = "FETCH_USER_SUCSESS"
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE"
export const USER_SING_OUT = "USER_SING_OUT";


let initialState = {
  user: {},
  isLoading: false,
  error: "",
}

const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, isLoading: true, user: {}, error: "" }
    case FETCH_USER_SUCSESS:
      return { ...state, isLoading: false, user: action.payload, error: "" }
    case FETCH_USER_FAILURE:
      return { 
        ...state, 
        isLoading: false, 
        user: {}, 
        error: action.payload 
      };
case USER_SING_OUT:
  return { 
    ...state,  
    user: {}, 
  
  };
    default:
      return state
  }
}


export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST })
export const fetchUserSucsess = (data) => ({
  type: FETCH_USER_SUCSESS,
  payload: data,
})
export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error.message,
})

 export const logoutUser = () => {
    return  {type: 'USER_SING_OUT',
  payload: {}} 
  };

export const loginUser = (user) => (dispatch) => {
  dispatch(fetchUserRequest())
  axios
    .post("https://rs-lang-back.herokuapp.com/signin", { ...user })
    .then(({ data }) => dispatch(fetchUserSucsess(data)))
    .catch((error) => dispatch(fetchUserFailure(error)))
}

export const createUser = (user) => (dispatch) => {
  dispatch(fetchUserRequest())
  axios
    .post("https://rs-lang-back.herokuapp.com/users", { ...user })
    .then(({ data }) => dispatch(fetchUserSucsess(data)))
    .catch((error) => dispatch(fetchUserFailure(error)))
}
export default SignUpReducer

