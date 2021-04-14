import React from "react"
import PropTypes from "prop-types"

const TeamMarket = ({ name, photoURL, description }) => (
  <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
    <div className="px-6">
      <img
        alt="photoURL"
        src={photoURL}
        className="shadow-lg rounded-full mx-auto max-w-120-px"
      />
      <div className="pt-6 text-center">
        <h5 className="text-xl font-bold">{name}</h5>
        <p className="mt-1 text-sm text-blueGray-600 uppercase font-semibold">
          Front-end Developer
        </p>
        <p className="mt-3 text-sm text-blueGray-400 font-semibold">
          {description}
        </p>
        <div className="mt-6 flex justify-center">
          <div className="bg-red-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1">
            <i className="fab fa-dribbble" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default TeamMarket

TeamMarket.propTypes = {
  name: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
