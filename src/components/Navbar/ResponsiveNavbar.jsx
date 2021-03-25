import { Link } from "react-router-dom";
import img_logo from "../../assets/img/logo_rslang.png";
import img_logo_sm from "../../assets/img/logo_rslang_sm.png";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from 'react';
import {logoutUser} from '../../redux/auth/user'

export default function ResponsiveNavbar(props) {

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dispatch = useDispatch();


  const controlUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  }

 //
 const handleLogoutUser =()=> {
 
    dispatch(logoutUser())
 
}



  const user = useSelector(({ user }) => user.user);
  console.log("user ", user);

  const isName = () => {
    if (!user.message) {
      return null;
    } else {
      return (<div className = "  divide-y-2 divide-gey-600 divide-solid"> <div  className=" w-full px-4 py-2 text-gray-700 hover:bg-gray-100"   >{user.name}</div>
       <button
        className=" w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"          
        >
          Sign out
        </button>
      </div>);
    }
  };

  return (
    <>
      <nav className="bg-white">
        <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start ">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img
                    className="block lg:hidden h-14 w-auto"
                    src={img_logo_sm}
                    alt="img_logo"
                  />
                </Link>
                <Link to="/">
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={img_logo}
                    alt="img_logo"
                  />
                </Link>
              </div>

              <div className="hidden sm:block sm:ml-6">
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
                to="/settings/"
                className="text-indigo-900 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md  font-medium text-xl"
              >
                Настройки
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
          
              {user.message ? (<div className="ml-3 relative">
                <div>
                  <button
                  onClick = {controlUserMenu}
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                <div
                  className={` ${showUserMenu  ? "block": "hidden"} z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1
                   bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  
                  {isName()}
                 
                </div>
              </div>) : (<div> 
              <Link
                to="/signin"
                  className="text-indigo-900 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md  font-medium  text-xl"
              >
                Sign In
              </Link></div>)}

              
            </div>
          </div>
        </div>
        <div className={"sm:hidden"} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
         
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
                to="/settings/"
                className="text-indigo-900 hover:bg-blue-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Настройки
              </Link>
              <Link
                to="/statistics/"
                className="text-indigo-900 hover:bg-blue-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Статистика
              </Link>  
          </div>
        </div>
      </nav>
    </>
  );
}
