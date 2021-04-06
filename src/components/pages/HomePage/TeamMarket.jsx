import React from "react"
import PropTypes from "prop-types"

const TeamMarket = ({ name, photoURL }) => (
  <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
    <div className="px-6">
      <img
        alt="photoURL"
        src={photoURL}
        className="shadow-lg rounded-full mx-auto max-w-120-px"
      />
      <div className="pt-6 text-center">
        <h5 className="text-xl font-bold">{name}</h5>
        <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
          Front-end Developer
        </p>
        <div className="mt-6">
          <button
            className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
            type="button"
          >
            <i className="fab fa-dribbble" />
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default TeamMarket

TeamMarket.propTypes = {
  name: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
}
