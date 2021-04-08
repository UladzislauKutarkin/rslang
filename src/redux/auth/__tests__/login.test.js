import {
  SignUpReducer,
  FETCH_USER_REQUEST,
  // FETCH_USER_SUCSESS,
  // FETCH_USER_FAILURE,
  // USER_SING_OUT,
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

  // it("change user", () => {
  //   expect(
  //     SignUpReducer(
  //       { user: { email: "test@test.com", password: "12345678" }, },
  //       {
  //         type: FETCH_USER_SUCSESS,
  //         user: { email: "test@test.com", password: "12345678" },
  //         isLoading: false,
  //       }
  //     )
  //   ).toEqual({
  //     user: { email: "test@test.com", password: "12345678" },
  //     isLoading: false,
  //     error: "",
  //   })
  // })
})
