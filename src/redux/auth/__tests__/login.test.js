import {
  SignUpReducer,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCSESS,
  // FETCH_USER_FAILURE,
} from "../user"

describe("SignUpReducer return state", () => {
  it("should return the initial state", () => {
    expect(SignUpReducer(undefined, {})).toEqual({
      user: {},
      isLoading: false,
      error: "",
    })
  })

  it("return state", () => {
    expect(
      SignUpReducer(
        {},
        {
          type: FETCH_USER_REQUEST,
          isLoading: true,
        }
      )
    ).toEqual({
      user: {},
      isLoading: true,
      error: "",
    })
  })

  it("change user", () => {
    expect(
      SignUpReducer(
        {
          user: {},
          isLoading: true,
          error: "",
        },
        {
          type: FETCH_USER_SUCSESS,
          payload: { email: "test@test.com", password: "12345678" },
        }
      )
    ).toEqual({
      isLoading: false,
      error: "",
      user: { email: "test@test.com", password: "12345678" },
    })
  })
})
