import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const VocabularyCard = ({ name, className, src }) => {
  return (
    <div className={className}>
      <h2 className="text-3xl leading-9 font-bold tracking-tight text-white sm:text-4xl sm:leading-10">
        {name}
      </h2>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-md bg-white shadow">
          <Link to={src}>
            <button type="button" className="text-gray-700 font-bold py-2 px-6">
              Start
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default VocabularyCard

VocabularyCard.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string,
}

VocabularyCard.defaultProps = {
  name: "",
  className: "",
  src: "",
}
