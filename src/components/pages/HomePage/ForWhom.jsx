import React from "react"
import PropTypes from "prop-types"

const ForWhom = ({ name, description }) => {
  return (
    <div className="w-full lg:w-3/12 px-4 text-center">
      <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-red-400 inline-flex items-center justify-center">
        <i className="fas fa-medal text-xl" />
      </div>
      <h6 className="text-xl mt-5 font-semibold text-gray-800">{name}</h6>
      <p className="mt-2 mb-4 text-blueGray-400">{description}</p>
    </div>
  )
}

export default ForWhom

ForWhom.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
