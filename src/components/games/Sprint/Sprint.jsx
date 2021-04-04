/* eslint-disable no-console */
import { useEffect, useState, useMemo, useRef } from "react"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"

import { useDispatch, useSelector } from "react-redux"
import { onNavbarAC, offNavbarAC } from "../../../redux/games/navbar"

import StatisticsModal from "../gamesComponents/StatisticsModal"

import sprintBack from "../../../assets/img/games/back_sprint.jpg"

import heart from "../../../assets/img/games/heart.png"
// eslint-disable-next-line no-unused-vars
import ok from "../../../assets/img/icons/icon_ok.png"
// eslint-disable-next-line no-unused-vars
import not from "../../../assets/img/icons/icon_not.png"

import close from "../../../assets/img/icons/icon_close.svg"
import fullscreen from "../../../assets/img/icons/icon_fullscreen.svg"
// eslint-disable-next-line no-unused-vars
import speak from "../../../assets/img/icons/icon_speek.svg"

import { getWordsPageAC } from "../../../redux/games/games"
import random from "../../../helpers/random"

import correct from "../../../assets/sound/correct.mp3"
import wrong from "../../../assets/sound/wrong.mp3"

// eslint-disable-next-line no-unused-vars
const Sprint = ({ location }) => {
  // eslint-disable-next-line no-unused-vars
  const [isStartGame, setIsStartGame] = useState(false)

  const [wordGroup, setWordGroup] = useState("0")

  const [wordsCount, setWordsCount] = useState(19)

  // eslint-disable-next-line no-unused-vars
  const [canvasSize, setCanvasSize] = useState({
    width: 100,
    height: 100,
  })

  // eslint-disable-next-line no-unused-vars
  const [timer, setTimer] = useState(60)
  const [isActive, setIsActive] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [angle, setAngle] = useState(-Math.PI / 2)
  // eslint-disable-next-line no-unused-vars
  const [timerArcStep, setTimerArcStep] = useState(Math.PI / 60)

  // eslint-disable-next-line no-unused-vars
  const [shuffledAnswers, setShuffledAnswers] = useState(["test"])
  // eslint-disable-next-line no-unused-vars
  const [statistics, setStatistics] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState("Sprint")
  const [life, setLife] = useState(5)
  // eslint-disable-next-line no-unused-vars
  const [currentWord, setCurrentWord] = useState({
    word: "",
    translate: "",
    possibleTranslate: "",
    isRight: false,
    isWrong: false,
    selected: false,
  })

  // eslint-disable-next-line no-unused-vars
  const correctSound = useMemo(() => new Audio(correct), [])
  // eslint-disable-next-line no-unused-vars
  const wrongSound = useMemo(() => new Audio(wrong), [])

  const timerRef = useRef()
  let canvas = {}

  // eslint-disable-next-line no-unused-vars
  let ctx = {}

  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const currentWordsPage =
    useSelector(({ wordsPage }) => wordsPage.wordsPage, []) || []

  const doFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      dispatch(offNavbarAC())
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      dispatch(onNavbarAC())
    }
  }

  const getWordPage = (e) => {
    const group = e.target.value || 0
    setWordGroup(group)
    dispatch(getWordsPageAC(group, random(0, 19)))
  }

  const gameCycle = () => {
    if (wordsCount >= 0) {
      console.log("wordsCount", wordsCount)
      const possibleTrans = Math.floor(random(0, 1))
        ? currentWordsPage[wordsCount].wordTranslate
        : currentWordsPage[random(0, 1)].wordTranslate

      setCurrentWord({
        ...currentWord,
        word: currentWordsPage[wordsCount].word,
        translate: currentWordsPage[wordsCount].wordTranslate,
        possibleTranslate: possibleTrans,
        isRight: false,
        isWrong: false,
        selected: false,
      })
    }
    if (wordsCount >= 0) {
      setWordsCount((prevWordCount) => prevWordCount - 1)
    }
  }

  // const drawCircle = () => {
  //   ctx.beginPath()
  //   ctx.arc(50, 50, 45, angle, (3 / 2) * Math.PI, false)
  //   ctx.stroke()
  // }

  const startGame = () => {
    setIsActive(true)
    gameCycle()
    // console.log("start game")
    // console.log("canvas.width ", canvas.width)
    // console.log("canvas.height ", canvas.height)
    // ctx.lineWidth = 7
    // ctx.strokeStyle = "#0788b8"
    // requestAnimationFrame(drawCircle)
  }

  const addWordSToStatistic = (flag) => {
    setStatistics([
      ...statistics,
      {
        word: `${currentWord.word}`,
        translate: `${currentWord.translate}`,
        ok: flag,
      },
    ])
  }

  const rightHandler = () => {
    if (currentWord.translate === currentWord.possibleTranslate) {
      addWordSToStatistic(true)
      setCurrentWord({
        ...currentWord,
        selected: true,
      })
    } else addWordSToStatistic(false)
    gameCycle()
  }
  const wrongHandler = () => {
    if (currentWord.translate !== currentWord.possibleTranslate) {
      addWordSToStatistic(true)
      setCurrentWord({
        ...currentWord,
        selected: true,
      })
    } else addWordSToStatistic(false)
    gameCycle()
  }

  useEffect(() => {
    canvas = timerRef.current
    // eslint-disable-next-line no-unused-vars
    ctx = canvas.getContext("2d")
    canvas.height = canvasSize.height
    canvas.width = canvasSize.height
  }, [])

  useEffect(() => {
    let timer60 = null
    if (isActive) {
      timer60 = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1)
        }

        if (timer <= 0) {
          clearInterval(timer60)
          setIsActive(false)
          console.log("time up")
        }
      }, 1000)
    }

    return () => clearInterval(timer60)
  })

  useEffect(() => {
    dispatch(getWordsPageAC(wordGroup, random(0, 19)))
  }, [])

  // setAngle((prevAngle) => prevAngle - timerArcStep)
  return (
    <div
      className="h-screen  w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${sprintBack})` }}
    >
      <h1 className="text-3xl text-center text-gray-400 pt-8  hidden  lg:block">
        {title}
      </h1>

      <div className=" absolute top-24 left-1  md:left-10 md:top-20">
        <div className="">
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            className="bg-yellow-700 focus:border-gray-200 m-2  border-2 border-gray-500  h-full py-2 px-2 pr-7  text-gray-200 sm:text-sm rounded-md"
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

      {/* game block */}
      <div className="brd-g absolute  text-4xl right-32 top-60 ">{timer}</div>

      <canvas
        ref={timerRef}
        className="brd absolute  right-20"
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px"`,
        }}
      >
        {" "}
      </canvas>

      <div
        className="bg-white border-2 border-blue-500 bg-opacity-20 absolute top-1/3 h-52 rounded-lg w-2/5"
        style={{ right: "5vw" }}
      >
        <div className="text-center text-blue-700 font-bold text-4xl">
          {currentWord.word}
        </div>
        <div className="text-center text-blue-900 font-medium text-3xl">
          {currentWord.possibleTranslate}
        </div>
      </div>
      <div className="absolute bottom-1/4 right-28">
        <button
          type="button"
          className="inline-block px-10 py-3 m-3 text-2xl font-medium leading-6 text-center text-white
        border-2 border-green-800 uppercase transition bg-green-600 rounded shadow ripple 
        hover:shadow-lg hover:bg-green-900 focus:outline-none"
          onClick={rightHandler}
        >
          Верно
        </button>
        <button
          type="button"
          className="inline-block px-10 py-3 m-3 text-2xl font-medium leading-6 text-center text-white
        border-2 border-green-800 uppercase transition bg-yellow-700 rounded shadow ripple 
        hover:shadow-lg hover:bg-green-900 focus:outline-none"
          onClick={wrongHandler}
        >
          Не верно
        </button>
      </div>
      {/* game block end */}

      <StatisticsModal
        show={wordsCount === -1 && currentWord.selected}
        statistics={statistics}
        setWordsCount={setWordsCount}
        setLife={setLife}
      />
    </div>
  )
}
export default withRouter(Sprint)
Sprint.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.any.isRequired,
}
