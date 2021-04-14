/* eslint-disable */
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./select.module.css"

function Select(props) {
  const { value, values, onChange } = props

  function handleChange(e) {
    const newValue = parseInt(e.target.value, 10)
    onChange(newValue)
  }

  return (
    <div className={styles.switch}>
      <select value={value} onChange={handleChange}>
        {values.length > 0 &&
          values.map((valueT, i) => (
            <option key={i} value={valueT}>
              {valueT}
            </option>
          ))}
      </select>
      <FontAwesomeIcon icon="caret-down" />
    </div>
  )
}

export default Select
