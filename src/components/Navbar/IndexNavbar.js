import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import imgLogo from "../../assets/img/logo_rslang.png"

export default function Navbar() {
  const userData = useSelector(({ user }) => user.user)
  const isName = () => {
    if (!userData.message) {
      return null
    }

    return <span>{userData.name}</span>
  }
  return (
    <>
      <nav className="top-0  z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow  ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between ">
          <Link to="/" className="">
            <img className="mr-8" src={imgLogo} alt="RSLANG" width="300" />
          </Link>
          <Link
            to="/textbook/"
            className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-8  whitespace-nowrap uppercase "
          >
            Электронный Учебник
          </Link>
          <Link
            to="/games/"
            className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-8  whitespace-nowrap uppercase"
          >
            Мини-игры
          </Link>
          <Link
            to="/settings/"
            className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-8  whitespace-nowrap uppercase"
          >
            Настройки
          </Link>
          <Link
            to="/statistics/"
            className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-8  whitespace-nowrap uppercase"
          >
            Статистика
          </Link>
          <Link
            to="/register/"
            className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-8  whitespace-nowrap uppercase"
          >
            Register
          </Link>
          <Link
            to="/signin/"
            className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-8  whitespace-nowrap uppercase"
          >
            Sign In
          </Link>
          {isName()}

        </div>
      </nav>
    </>
  )
}
