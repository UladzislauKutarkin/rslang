import { useCallback } from "react"
import PropTypes from "prop-types"

const TextInput = ({
  label,
  placeholder,
  className,
  onChange,
  type,
  value,
}) => {
  const handleInputChange = useCallback(
    (e) => {
      onChange(e.target.value)
    },
    [onChange]
  )
  return (
    <div className={className}>
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <input
        value={value}
        onChange={handleInputChange}
        type={type}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextInput

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
}

TextInput.defaultProps = {
  value: "",
  type: "text",
  className: "",
  placeholder: "",
  label: "",
}
