import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Redirect } from "react-router-dom"
import TextInput from "../TextInput"
import { loginUser } from "../../redux/auth/user"

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [isData, setIsData] = useState(false)
  const dispatch = useDispatch()
  const error = useSelector((state) => state.user.error)
  const userData = useSelector(({ user }) => user.user)

  const handleFormChange = useCallback(
    (type) => (inputValue) =>
      setForm((prevState) => ({ ...prevState, [type]: inputValue })),
    []
  )

  const handleButtonClick = useCallback(() => {
    if (userData) {
      dispatch(loginUser(form))
      setForm({
        email: "",
        password: "",
      })
      setIsData(true)
    }
  }, [userData, dispatch, form])

  if (isData) {
    return <Redirect to="/" />
  }
  return (
    <BrowserRouter>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3" />
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Sign in</small>
                </div>
                <form>
                  <TextInput
                    value={form.email}
                    onChange={handleFormChange("email")}
                    label="email"
                    placeholder="Email"
                    type="email"
                    className="relative w-full mb-3"
                  />
                  <TextInput
                    value={form.password}
                    onChange={handleFormChange("password")}
                    label="password"
                    placeholder="Password"
                    type="password"
                    className="relative w-full mb-3"
                  />
                  <div className="text-center mt-6">
                    <button
                      onClick={handleButtonClick}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
                {error && <span>{error}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default SignIn
