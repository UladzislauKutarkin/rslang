import React from "react"
import PropTypes from "prop-types"

const Button = ({ className, name, data, group }) =>
  group + 1 === data ? (
    <button
      type="button"
      data-page={data}
      className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white border-2 border-green-800 uppercase transition bg-green-800 rounded shadow ripple hover:shadow-lg hover:bg-green-900 focus:outline-none"
    >
      {name}
    </button>
  ) : (
    <button type="button" data-page={data} className={className}>
      {name}
    </button>
  )

export default Button

Button.propTypes = {
  name: PropTypes.string,
  data: PropTypes.string,
  className: PropTypes.string,
  group: PropTypes.number,
}

Button.defaultProps = {
  name: "",
  className: "",
  data: "",
  group: 0,
}
