import { useDispatch, useSelector } from "react-redux"
import React, { useCallback, useState } from "react"
import { changeSettingsButtons } from "../../../redux/settings/settings"

const ChangeButtons = () => {
  const buttonOn = useSelector(({ settings }) => settings.buttons)
  const [button, setButton] = useState(buttonOn)
  const dispatch = useDispatch()

  const handleSwitchButtons = useCallback(
    (e) => {
      dispatch(changeSettingsButtons(e.target.checked))
      setButton(e.target.checked)
    },
    [dispatch]
  )

  return (
    <>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          checked={button}
          onChange={handleSwitchButtons}
          type="checkbox"
          name="toggle"
          id="toggle"
          className="toggle-checkbox outline-none	 absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label
          htmlFor="toggle"
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        />
      </div>
      <label htmlFor="toggle" className="text-xs text-gray-700">
        Нажми меня
      </label>
    </>
  )
}

export default ChangeButtons
