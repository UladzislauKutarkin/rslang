/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"

export default function CardStats({ game }) {
  const { title, all, right, wrong } = game

  return (
    <>
      <div className="relative flex flex-col w-11/12 break-words bg-white rounded m-10  shadow-lg">
        <div className="  flex-auto px-20 py-4">
          <div className=" flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-pink-900 underline  uppercase font-bold text-xl">
                {title}
              </h5>
              <div className="font-semibold text-xl text-blueGray-700">
                Всего слов:<span className="text-blue-900"> {all}</span>
              </div>
              <div className="font-semibold  text-xl text-blueGray-700">
                Правильно: <span className="text-green-700"> {right}</span>
              </div>
              <div className="font-semibold text-xl">
                Ошибок: <span className="text-red-700"> {wrong}</span>
              </div>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={` text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-400`}
              />
            </div>
          </div>
          <p className="text-sm text-blueGray-400 mt-4">
            <span className="mr-2">
              {((right / all) * 100).toFixed(1)}% Успешных
            </span>
            <span className="whitespace-nowrap">за сегодня</span>
          </p>
        </div>
      </div>
    </>
  )
}

CardStats.propTypes = {
  title: PropTypes.string,
  all: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  game: PropTypes.any.isRequired,
}

CardStats.defaultProps = {
  title: "",
}
