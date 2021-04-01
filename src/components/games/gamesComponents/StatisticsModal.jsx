import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PureModal from "react-pure-modal"
import "react-pure-modal/dist/react-pure-modal.min.css"
import PropTypes from "prop-types"

// eslint-disable-next-line no-unused-vars
const StatisticsModal = ({ show, statistics, setWordsCount, setLife }) => {
  const [modal, setModal] = useState(show)

  // eslint-disable-next-line no-unused-vars
  // const statisticsFake = [
  //   { word: "boat", translate: "лодка", ok: true },
  //   { word: "heart", translate: "сердце", ok: false },\
  // ]

  useEffect(() => {
    setModal(show)
  }, [show])

  return (
    <PureModal
      replace="true"
      width="50vh"
      className=" justify-center  h-auto w-11/12 md:w-1/2 p-5   bg-white text-center rounded-md "
      isOpen={modal}
      closeButton={<div className="x brd bg-white "> </div>}
      closeButtonPosition="header"
      onClose={() => {
        setModal(false)
        return true
      }}
    >
      <div className="flex justify-center  m-2">
        <div className="text-2xl mx-2">Знаю</div>
        <div className="bg-green-500 mx-2 rounded-full py-1 px-5 text-xl text-white">
          {statistics.reduce((acc, el) => (el.ok ? acc + 1 : acc), 0)}
        </div>
      </div>
      <div className="mb-10">
        {statistics
          .filter((el) => el.ok)
          .map((filteredEl) => (
            <div key={filteredEl.word}>
              <strong>{`${filteredEl.word}`} </strong> -
              {`${filteredEl.translate}`}
            </div>
          ))}
      </div>
      <div className="flex justify-center m-2">
        <div className="text-2xl mx-2">Ошибок</div>
        <div className="bg-red-500 mx-2 rounded-full py-1 px-5 text-xl text-white">
          {statistics.reduce((acc, el) => (!el.ok ? acc + 1 : acc), 0)}
        </div>
      </div>
      <div className="mb-10">
        {statistics
          .filter((el) => !el.ok)
          .map((filteredEl) => (
            <div key={filteredEl.word}>
              <strong>{`${filteredEl.word}`} </strong> -
              {`${filteredEl.translate}`}
            </div>
          ))}
      </div>
      <div className=" mt-8">
        <Link to="/savanna/continue">
          <button
            type="button"
            className="focus:outline-none mx-5 text-white text-sm py-1 px-5 rounded-md bg-purple-800 hover:bg-purple-900 hover:shadow-lg"
            // eslint-disable-next-line no-console
            onClick={() => {
              setWordsCount(19)
              setLife(5)
            }}
          >
            Продожить
          </button>
        </Link>
        <Link
          className="focus:outline-none mx-5  p-0 text-white text-sm py-1 px-5 rounded-md bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg"
          to="/games/"
        >
          Выйти
        </Link>
      </div>
    </PureModal>
  )
}
export default StatisticsModal
StatisticsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  statistics: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  setWordsCount: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  setLife: PropTypes.any.isRequired,
}
