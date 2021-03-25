import React, { useState } from "react"
import PropTypes from "prop-types"
import PureModal from "react-pure-modal"
import Button from "../../Button"
import "react-pure-modal/dist/react-pure-modal.min.css"
import settings from "../../../assets/img/settings.svg"
import ChangeTranslate from "./ChangeTranslate"

const Settings = ({ handleGroupClick, group }) => {
  const [modal, setModal] = useState(false)

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
        {/* <ChangeTranslate/> */}
      </PureModal>

      <div className>
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
          <div
            onClick={handleGroupClick}
            className="w-3/4 flex justify-between mt-8"
          >
            <Button
              data="1"
              group={group}
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-purple-500 rounded shadow ripple hover:shadow-lg hover:bg-purple-600 focus:outline-none"
              name="Группа 1"
            />
            <Button
              data="2"
              group={group}
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-purple-500 rounded shadow ripple hover:shadow-lg hover:bg-purple-600 focus:outline-none"
              name="Группа 2"
            />
            <Button
              data="3"
              group={group}
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-purple-500 rounded shadow ripple hover:shadow-lg hover:bg-purple-600 focus:outline-none"
              name="Группа 3"
            />
            <Button
              data="4"
              group={group}
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-purple-500 rounded shadow ripple hover:shadow-lg hover:bg-purple-600 focus:outline-none"
              name="Группа 4"
            />
            <Button
              data="5"
              group={group}
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-purple-500 rounded shadow ripple hover:shadow-lg hover:bg-purple-600 focus:outline-none"
              name="Группа 5"
            />
            <Button
              data="6"
              group={group}
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-purple-500 rounded shadow ripple hover:shadow-lg hover:bg-purple-600 focus:outline-none"
              name="Группа 6"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings

Settings.propTypes = {
  group: PropTypes.number,
  handleGroupClick: PropTypes.func.isRequired,
}

Settings.defaultProps = {
  group: 0,
}
