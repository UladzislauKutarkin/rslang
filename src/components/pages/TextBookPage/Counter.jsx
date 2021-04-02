import PropTypes from "prop-types"

const Counter = ({ counter }) => {
  return (
    <div className="w-1/3 h-10">
      <div className="inline-block">
        <div>
          <div className="flex flex-row bg-white shadow-sm rounded p-4">
            <div className="flex items-center justify-center flex-shrink-0 h-8 w-8 rounded-xl bg-blue-100 text-blue-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow ml-4">
              <div className="text-sm text-gray-500">Слов</div>
              <div className="font-bold text-lg">{counter}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Counter

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
}
