import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { BrowserRouter, Redirect } from "react-router-dom"
import TextInput from "../TextInput"
import { createUser } from "../../redux/auth/user"

const Register = () => {
  const [isData, setIsData] = useState(false)
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  })

  const dispatch = useDispatch()
  const error = useSelector((state) => state.user.error)
  const handleFormChange = useCallback(
    (type) => (inputValue) => {
      setForm((prevState) => ({ ...prevState, [type]: inputValue }))
    },
    []
  )

  const handleButtonClick = useCallback(() => {
    dispatch(createUser(form))
    setIsData(true)
    setForm({
      email: "",
      name: "",
      password: "",
    })
  }, [dispatch, form])

  const handleUploadButton = useCallback((e) => {
    const data = new FormData()
    const file = e.target.files[0]
    data.append("file", file)
    data.append("upload_preset", "ml_default")
    axios
      .post("https://api.cloudinary.com/v1_1/yauheni-beiduk/image/upload", data)
      .then((response) => {
        localStorage.setItem("avatar", response.data.secure_url)
      })
      .catch(function err(errors) {
        console.log(errors)
      })
  }, [])
  if (isData) {
    return <Redirect to="/signin" />
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
                  <small>Register</small>
                </div>
                <form>
                  <TextInput
                    value={form.name}
                    onChange={handleFormChange("name")}
                    label="name"
                    placeholder="Name"
                    type="text"
                    className="relative w-full mb-3"
                  />
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
                  <div className="flex w-full items-center justify-center bg-grey-lighter">
                    <label className="w-64 flex flex-col items-center px-1 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-black hover:text-white">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span className="mt-2 text-base leading-normal">
                        Upload photo
                      </span>
                      <input
                        data-cloudinary-field="image_id"
                        data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
                        onChange={handleUploadButton}
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      data-testid="clickRegister"
                      onClick={handleButtonClick}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Create Account
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

export default Register
