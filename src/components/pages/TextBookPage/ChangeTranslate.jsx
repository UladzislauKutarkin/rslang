import { useDispatch, useSelector } from "react-redux"
import React, { useCallback, useState } from "react"
import { changeSettingsTranslate } from "../../../redux/settings/settings"

const ChangeTranslate = () => {
  const tranlated = useSelector(({ settings }) => settings.translate)

  const [translate, setTranslate] = useState(tranlated)

  const dispatch = useDispatch()

  const handleSwitchTranslate = useCallback(
    (e) => {
      dispatch(changeSettingsTranslate(e.target.checked))
      setTranslate(e.target.checked)
    },
    [dispatch]
  )

  return (
    <>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          checked={translate}
          onChange={handleSwitchTranslate}
          type="checkbox"
          name="toggle"
          id="toggle"
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label
          htmlFor="toggle"
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        />
      </div>
      <label htmlFor="toggle" className="text-xs text-gray-700">
        Toggle me.
      </label>
    </>
  )
}

export default ChangeTranslate
