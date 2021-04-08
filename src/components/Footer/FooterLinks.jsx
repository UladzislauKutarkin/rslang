import React from "react"
import PropTypes from "prop-types"

const FooterLinks = ({ gitLink, gitName, icon }) => {
  return (
    <div className="flex flex-col items-center w-52">
      <div className="flex  flex-col">
        <a href={gitLink} target="_blank" rel="noopener noreferrer">
          <img
            className="transform hover:scale-110 motion-reduce:transform-none bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
            src={icon}
            alt="logo"
          />
        </a>
      </div>
      <div className="text-center">{gitName}</div>
    </div>
  )
}

export default FooterLinks

FooterLinks.propTypes = {
  icon: PropTypes.string.isRequired,
  gitLink: PropTypes.string,
  gitName: PropTypes.string,
}

FooterLinks.defaultProps = {
  gitLink: "",
  gitName: "",
}
