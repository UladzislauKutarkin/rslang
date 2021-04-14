import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import React, { useCallback, useState, useEffect } from "react"
import imgLogoSm from "../../assets/img/logo_rslang_sm.png"
import { logoutUser } from "../../redux/auth/user"
import { isAuthorized } from "../../helpers/globals"

export default function ResponsiveNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserDropDown, setShowUserDropDown] = useState(false)
  const userCurrent = useSelector(({ user }) => user.user)

  const dispatch = useDispatch()

  const handleSwitchUserDropDown = useCallback(() => {
    setShowUserDropDown(!showUserDropDown)
  }, [showUserDropDown])

  const controlMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  const handleLogoutUser = () => {
    dispatch(logoutUser())
    setShowUserDropDown((prevState) => !prevState)
  }

  const userDropDown = () => {
    return (
      <div className="divide-y-2 divide-gey-600 divide-solid">
        <div className=" w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
          {JSON.parse(localStorage.getItem("user"))?.name}
        </div>
        <button
          type="button"
          onClick={handleLogoutUser}
          className=" w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Sign out
        </button>
      </div>
    )
  }

  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
    })
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
        })
      }
      window.addEventListener("resize", handleResize)
      handleResize()
      return () => window.removeEventListener("resize", handleResize)
    }, [])
    return windowSize
  }
  const abc = useWindowSize()

  return (
    <>
      {useSelector(({ showNavbar }) => showNavbar.showNavbar) && (
        <nav className="bg-white">
          <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  type="button"
                  onClick={controlMobileMenu}
                  className={` inline-flex items-center justify-center p-2 rounded-md text-gray-400 
            hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
                >
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start ">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img
                      className="block h-14 w-auto"
                      src={imgLogoSm}
                      alt="imgLogoSm"
                    />
                  </Link>
                </div>
                <div className={abc.width <= 640 ? "hidden" : "block"}>
                  <div className="flex space-x-4">
                    <Link
                      to="/textbook/"
                      className="text-indigo-900 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md  font-medium  text-xl"
                    >
                      Электронный Учебник
                    </Link>
                    <Link
                      to="/games/"
                      className="text-indigo-900 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md  font-medium text-xl"
                    >
                      Мини-игры
                    </Link>
                    <Link
                      to="/statistics/"
                      className="text-indigo-900 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md  font-medium text-xl"
                    >
                      Статистика
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0  ">
                {isAuthorized || userCurrent.userId ? (
                  <div className="ml-3 relative">
                    <div>
                      <button
                        onClick={handleSwitchUserDropDown}
                        type="button"
                        className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={
                            localStorage.getItem("avatar") ||
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          }
                          alt="avatar"
                        />
                      </button>
                    </div>
                    {showUserDropDown && (
                      <div className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userDropDown()}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/signin"
                      className="text-indigo-900 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md  font-medium  text-xl"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {showMobileMenu && (
            <div className="animate-slowGrow sm:hidden" id="mobile-menu">
              <div className=" px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/textbook/"
                  className="text-indigo-900 hover:bg-blue-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Электронный Учебник
                </Link>
                <Link
                  to="/games/"
                  className="text-indigo-900 hover:bg-blue-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Мини-игры
                </Link>
                <Link
                  to="/statistics/"
                  className="text-indigo-900 hover:bg-blue-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Статистика
                </Link>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  )
}
