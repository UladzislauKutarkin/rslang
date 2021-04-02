/* eslint-disable no-console */
import { useEffect, useState, useMemo } from "react"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"

import { useDispatch, useSelector } from "react-redux"

import { onNavbarAC, offNavbarAC } from "../../../redux/games/navbar"

import StatisticsModal from "../gamesComponents/StatisticsModal"

import savannaBack from "../../../assets/img/games/back_audio.jpg"
import heart from "../../../assets/img/games/heart.png"

import close from "../../../assets/img/icons/icon_close.svg"
import fullscreen from "../../../assets/img/icons/icon_fullscreen.svg"

import { getWordsPageAC } from "../../../redux/games/games"
import random from "../../../helpers/random"

import correct from "../../../assets/sound/correct.mp3"
import wrong from "../../../assets/sound/wrong.mp3"

// eslint-disable-next-line no-unused-vars
import { shuffle } from "../../../helpers/shuffle"

// eslint-disable-next-line no-unused-vars
const AudioCall = ({ location }) => {
  console.log("location", location)
  // eslint-disable-next-line no-unused-vars
  const [isStartGame, setIsStartGame] = useState(false)

  const [wordGroup, setWordGroup] = useState("0")

  const [wordsCount, setWordsCount] = useState(19)
  // eslint-disable-next-line no-unused-vars
  const [shuffledAnswers, setShuffledAnswers] = useState(["dump"])
  // eslint-disable-next-line no-unused-vars
  const [statistics, setStatistics] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState("Audio Call")
  const [life, setLife] = useState(5)

  // eslint-disable-next-line no-unused-vars
  const correctSound = useMemo(() => new Audio(correct), [])
  // eslint-disable-next-line no-unused-vars
  const wrongSound = useMemo(() => new Audio(wrong), [])

  const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
  const currentWordsPage =
    useSelector(({ wordsPage }) => wordsPage.wordsPage) || []

  const gameCycle = () => {
    console.log("gameCycle")
    // todo
    // вывести снак аудио
    //  проиграть звук
    // вывести 5 кнопок
    // вывести кнопку не знаю
  }

  const startGame = () => {
    // todo  начать цикл
    gameCycle()
  }

  const getWordPage = (e) => {
    const group = e.target.value || 0
    setWordGroup(group)
    dispatch(getWordsPageAC(group, random(0, 19)))
  }

  useEffect(() => {
    dispatch(getWordsPageAC(wordGroup, random(0, 19)))
  }, [])

  const doFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      dispatch(offNavbarAC())
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      dispatch(onNavbarAC())
    }
  }

  return (
    <div
      className="h-screen  w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${savannaBack})` }}
    >
      <h1 className="text-3xl text-center text-gray-400 pt-8  hidden  lg:block">
        {title}
      </h1>

      <div className=" absolute top-24 left-1  md:left-10 md:top-20">
        <div className="">
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            className="focus:border-gray-200 m-2  border-2 border-gray-500 bg-transparent h-full py-2 px-2 pr-7  text-gray-200 sm:text-sm rounded-md"
            value={wordGroup}
            onChange={getWordPage}
          >
            <option value="0">Простые </option>
            <option value="1">Простые +</option>
            <option value="2">Средние</option>
            <option value="3">Средние +</option>
            <option value="4">Сложные</option>
            <option value="5">Сложные +</option>
          </select>

          <button
            type="button"
            className="inline-block px-10 py-1 mx-2 text-xs font-medium leading-6 text-center text-white
        border-2 border-green-800 uppercase transition bg-green-500 rounded shadow ripple 
        hover:shadow-lg hover:bg-green-900 focus:outline-none"
            onClick={startGame}
          >
            start
          </button>
        </div>
      </div>

      <div className="absolute  flex top-20 md:top-20 right-24">
        {[...Array(life)].map((el, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <img key={idx} className="mx-0.5 w-6" src={heart} alt="life" />
        ))}
      </div>

      {/* exit */}
      <div className="absolute top-20 right-5">
        <Link to="/games/">
          <img className="w-4" src={close} alt="X" />
        </Link>
      </div>

      <div className="absolute top-20 right-14">
        <button type="button" onClick={doFullscreen}>
          <img className="w-6" src={fullscreen} alt="full" />
        </button>
      </div>

      {/* aidio picture div */}
      <div
        className="-m-32  h-50 w-64  absolute text-2xl text-center"
        style={{ top: "35vw", left: "50vw" }}
      >
        Картинка
      </div>

      {/* aidio sign div */}
      <div
        className="-m-32  h-50 w-64  absolute text-2xl text-center"
        style={{ top: "45vw", left: "50vw" }}
      >
        Знак аудио
      </div>

      {/* buttons */}
      <div
        className=" animate-appear absolute w-full text-2xl   "
        style={{ top: "55vh", left: "0" }}
      >
        {true && (
          <div className="text-center">
            {shuffledAnswers.map((el, idx) => (
              <button
                type="button"
                key={`${idx + 1}`}
                className="inline-block bg-white bg-opacity-50 mx-2 px-3 py-1 text-xs font-medium leading-6 text-center text-black
    border-2 border-gray-600 uppercase rounded shadow ripple 
    hover:shadow-lg hover:bg-purple-500 hover:text-white focus:outline-none"
              >
                {el}
              </button>
            ))}
          </div>
        )}
      </div>

      <StatisticsModal
        show={!wordsCount || !life}
        statistics={statistics}
        setWordsCount={setWordsCount}
        setLife={setLife}
      />
    </div>
  )
}
export default withRouter(AudioCall)
AudioCall.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.any.isRequired,
}
