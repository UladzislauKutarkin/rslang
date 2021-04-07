import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
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

const Settings = ({
  isSetings,
  isStudied,
  isCounter,
  userCounter,
  groupType,
  pageType,
  location,
}) => {
  const userCurrent = useSelector(({ user }) => user.user)
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const selectedGroup = useSelector(({ pagination }) => pagination[groupType])
  const handleChangeGroup = useCallback(
    (value) => () => {
      dispatch(changeGroup(value, groupType))
      localStorage.setItem(groupType, value)
      dispatch(changePage(0, pageType))
    },
    [dispatch, groupType, pageType]
  )

  const groupForGame = useSelector(({ pagination }) => pagination.groupTextBook)
  const pageNumberForGame = useSelector(
    ({ pagination }) => pagination.pageTextBook
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
      <div className="container mx-auto mb-0 mb-6">
        <div className="flex flex-wrap w-auto mx-8 justify-between">
          {isCounter ? <Counter counter={userCounter} /> : null}
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
              className="inline-block w-36 text-xs mx-6 font-medium my-2 px-6 py-2 text-center text-white uppercase transition bg-yellow-600 rounded shadow ripple hover:shadow-lg hover:bg-yellow-700 focus:outline-none"
            >
              {element[0]}
            </Link>
          ))}
          <div className="flex flex-wrap mt-8  h-20  my-2 w-full justify-between">
            <Link to="/vocabulary/">
              {isAuthorized || userCurrent.userId ? (
                <button
                  // eslint-disable-next-line react/no-array-index-key
                  type="button"
                  className="inline-block w-36 mx-6 px-6 py-2 text-xs font-medium text-center text-white uppercase transition bg-yellow-900 rounded shadow ripple hover:shadow-lg hover:bg-yellow-700 focus:outline-none"
                >
                  Cловарь
                </button>
              ) : null}
            </Link>
            {isSetings ? (
              <div
                className="absolute top-20 right-2 sm:my-0 my-2"
                onClick={() => setModal(true)}
              >
                <img
                  className="w-8 h-8 cursor-pointer"
                  src={settings}
                  alt="settings"
                />
              </div>
            ) : null}
          </div>
        </div>
        {isStudied ? (
          <div className="flex flex-wrap justify-center">
            <div className="w-3/4  flex flex-wrap justify-between mt-8">
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
                  onClick={handleChangeGroup(index)}
                  className={cn(
                    "inline-block  my-2 mx-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition rounded shadow ripple hover:shadow-lg  focus:outline-none",
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
  userCounter: PropTypes.number,
  isStudied: PropTypes.bool,
  isCounter: PropTypes.bool,
  location: PropTypes.string.isRequired,
  groupType: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
}

Settings.defaultProps = {
  isStudied: true,
  isCounter: false,
  userCounter: 0,
}
