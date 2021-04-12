import { USER_SING_OUT, logoutUser } from "../user"

describe("actions", () => {
  it("should create an action user sign out", () => {
    const payload = {}
    const expectedAction = {
      type: USER_SING_OUT,
      payload,
    }
    expect(logoutUser(payload)).toEqual(expectedAction)
  })
})
