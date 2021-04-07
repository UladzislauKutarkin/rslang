import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes, { func } from "prop-types"
import cn from "classnames"
import PureModal from "react-pure-modal"
import "react-pure-modal/dist/react-pure-modal.min.css"
import { Link, withRouter } from "react-router-dom"
import settings from "../../../assets/img/settings.svg"
import ChangeTranslate from "./ChangeTranslate"
import { changeGroup, changePage } from "../../../redux/pagination/pagination"
import ChangeButtons from "./ChangeButtons"
import Counter from "./Counter"
import { isAuthorized } from "../../../helpers/globals"

const Settings = (props) => {
  const {
    isSetings,
    handleVocavularyChangeGroup,
    selectedGroup,
    isStudied,
    isCounter,
    userCounter,
    location,
  } = props

  console.log("---location---", location.pathname)
  const userCurrent = useSelector(({ user }) => user.user)
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  // const userCurrent = useSelector(({ user }) => user.user)
  const handleChangeGroup = useCallback(
    (group) => () => {
      dispatch(changeGroup(group))
      localStorage.setItem("group", group)
      dispatch(changePage(0))
    },
    [dispatch]
  )

  // YA
  const groupForGame = useSelector(({ pagination }) => pagination.group)
  const pageNumberForGame = useSelector(({ pagination }) => pagination.page)
  // eslint-disable-next-line no-console
  console.log(
    "pagination.group, pagination.page ",
    groupForGame,
    pageNumberForGame
  )

  return (
    <>
      {isSetings ? (
        <PureModal
          width="400px"
          header="Settings"
          isOpen={modal}
          closeButton="x"
          className=" justify-center h-auto w-11/12 md:w-1/2 p-5  bg-white text-center rounded-md "
          closeButtonPosition="bottom"
          onClose={() => {
            setModal(false)
            return true
          }}
        >
          <div>Отображать перевод:</div>
          <ChangeTranslate />
          <div>Отображать кнопки:</div>
          <ChangeButtons />
        </PureModal>
      ) : null}
      <div className="container">
        <div className="flex justify-between h-10">
          {isCounter ? <Counter counter={userCounter} /> : null}
          <div className="flex justify-between w-2/5">
            {[
              ["Cаванна", "savanna"],
              ["Аудиовызов", "audiocall"],
              ["Спринт", "sprint"],
              ["Своя игра", "castomgame"],
            ].map((element) => (
              <Link
                to={`/${element[1]}${location.pathname}${groupForGame}/${pageNumberForGame}`}
                key={element[0]}
                type="button"
                className="block px-6  mx-2 py-2 text-xs font-medium  text-center text-white uppercase transition
                 bg-yellow-600 rounded shadow ripple hover:shadow-lg hover:bg-yellow-700 focus:outline-none"
              >
                {element[0]}
              </Link>
            ))}
          </div>
          <Link to="/vocabulary/">
            {isAuthorized || userCurrent.userId ? (
              <button
                // eslint-disable-next-line react/no-array-index-key
                type="button"
                className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-yellow-900 rounded shadow ripple hover:shadow-lg hover:bg-yellow-700 focus:outline-none"
              >
                Cловарь
              </button>
            ) : null}
          </Link>
          {isSetings ? (
            <div onClick={() => setModal(true)}>
              <img
                className="w-8 h-8 cursor-pointer"
                src={settings}
                alt="settings"
              />
            </div>
          ) : null}
        </div>
        {isStudied ? (
          <div className="flex justify-center">
            <div className="w-3/4 flex justify-between mt-8">
              {[
                "Группа 1",
                "Группа 2",
                "Группа 3",
                "Группа 4",
                "Группа 5",
                "Группа 6",
              ].map((item, index) => (
                <button
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  type="button"
                  onClick={
                    isSetings
                      ? handleChangeGroup(index)
                      : handleVocavularyChangeGroup(index)
                  }
                  className={cn(
                    "inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition rounded shadow ripple hover:shadow-lg  focus:outline-none",
                    {
                      "bg-red-200 hover:bg-red-600": index === 1,
                    },
                    {
                      "bg-blue-200 hover:bg-blue-600": index === 0,
                    },
                    {
                      "bg-green-200 hover:bg-green-600": index === 2,
                    },
                    {
                      "bg-green-600 hover:bg-green-800": index === 3,
                    },
                    {
                      "bg-yellow-200 hover:bg-yellow-600": index === 4,
                    },
                    {
                      "bg-gray-400 hover:bg-gray-600": index === 5,
                    },
                    {
                      "bg-blue-900 hover:bg-blue-900": index === selectedGroup,
                    }
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default withRouter(Settings)

Settings.propTypes = {
  isSetings: PropTypes.bool.isRequired,
  handleVocavularyChangeGroup: PropTypes.func,
  userCounter: PropTypes.number,
  selectedGroup: PropTypes.number.isRequired,
  isStudied: PropTypes.bool,
  isCounter: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.any.isRequired,
}

Settings.defaultProps = {
  handleVocavularyChangeGroup: func,
  isStudied: true,
  isCounter: false,
  userCounter: 0,
}
