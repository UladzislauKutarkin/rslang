import React, { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import cn from "classnames"
import PureModal from "react-pure-modal"
import Button from "../../Button"
import "react-pure-modal/dist/react-pure-modal.min.css"
import settings from "../../../assets/img/settings.svg"
import ChangeTranslate from "./ChangeTranslate"
import { changeGroup } from "../../../redux/pagination/pagination"
import ChangeButtons from "./ChangeButtons"

const Settings = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleChangeGroup = useCallback(
    (group) => () => {
      dispatch(changeGroup(group))
      setSelectedIndex(group)
    },
    [dispatch]
  )
  return (
    <>
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

      <div>
        <div className="flex justify-between h-10">
          <div className="flex justify-between w-2/5">
            <Button
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-yellow-600 rounded shadow ripple hover:shadow-lg hover:bg-yellow-700 focus:outline-none"
              name="Саванна"
            />
            <Button
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-yellow-600 rounded shadow ripple hover:shadow-lg hover:bg-yellow-700 focus:outline-none"
              name="Аудиовызов"
            />
            <Button
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-yellow-600 rounded shadow ripple hover:shadow-lg hover:bg-yellow-700 focus:outline-none"
              name="Спринт"
            />
            <Button
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-yellow-600 rounded shadow ripple hover:shadow-lg hover:bg-yellow-700 focus:outline-none"
              name="Своя игра"
            />
          </div>
          <div onClick={() => setModal(true)}>
            <img
              className="w-8 h-8 cursor-pointer"
              src={settings}
              alt="settings"
            />
          </div>
        </div>
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
                onClick={handleChangeGroup(index)}
                className={cn(
                  "inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-purple-500 rounded shadow ripple hover:shadow-lg hover:bg-purple-600 focus:outline-none",
                  {
                    "inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white border-2 border-green-800 uppercase transition bg-green-800 rounded shadow ripple hover:shadow-lg hover:bg-green-900 focus:outline-none":
                      index === selectedIndex,
                  }
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
