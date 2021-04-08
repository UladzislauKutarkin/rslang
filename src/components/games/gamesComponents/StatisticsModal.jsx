import { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
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
      isOpen={modal}
      width="50vh"
      closeButton={<div className=" bg-white "> &nbsp; </div>}
      className=" justify-center  h-auto w-11/12 md:w-1/2 p-5   bg-white text-center rounded-md "
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
              {` ${filteredEl.right}-${filteredEl.wrong}`}
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
              {` ${filteredEl.right}-${filteredEl.wrong}`}
            </div>
          ))}
      </div>
      <div className=" mt-8">
        <button
          type="button"
          className="focus:outline-none mx-5 text-white text-sm py-1 px-5 rounded-md bg-purple-800 hover:bg-purple-900 hover:shadow-lg"
          onClick={() => {
            setWordsCount(19)
            setLife(5)
            setModal(false)
          }}
        >
          Продожить
        </button>

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
export default withRouter(StatisticsModal)
StatisticsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  statistics: PropTypes.any.isRequired,
  setWordsCount: PropTypes.func.isRequired,
  setLife: PropTypes.func.isRequired,
}
