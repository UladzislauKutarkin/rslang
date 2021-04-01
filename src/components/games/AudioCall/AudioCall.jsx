/* eslint-disable no-console */
import { useEffect, useState, useMemo, useRef } from "react"
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

import { shuffle } from "../../../helpers/shuffle"

// eslint-disable-next-line no-unused-vars
const AudioCall = ({ location }) => {
  console.log("location", location)
  const [isStartGame, setIsStartGame] = useState(false)

  const [wordGroup, setWordGroup] = useState("0")

  const [wordsCount, setWordsCount] = useState(19)
  const [shuffledAnswers, setShuffledAnswers] = useState(["dump"])
  const [statistics, setStatistics] = useState([])
  const [alive, setAlive] = useState(false)
  const [title, setTitle] = useState("Audio Call")
  const [life, setLife] = useState(5)

  const wordRef = useRef()
  const dropRef = useRef()
  const buttonsRef = useRef()

  const isWrongSelectRef = useRef()
  const isSelectRef = useRef()
  const backRef = useRef()

  const InCycle = useMemo(() => ({ on: false }), [])
  const speed = 5

  const shuffledAnswersGlob = useMemo(() => ({ shufl: [] }), [])

  const correctSound = useMemo(() => new Audio(correct), [])
  const wrongSound = useMemo(() => new Audio(wrong), [])

  const dispatch = useDispatch()

  const currentWordsPage = {
    page: useSelector(({ wordsPage }) => wordsPage.wordsPage) || [],
  }

  const reduceLives = () => {
    if (life > 0) {
      setLife(life - 1)
    }
  }

  const addWordSToStatistic = (flag) => {
    setStatistics([
      ...statistics,
      {
        word: `${shuffledAnswersGlob.word}`,
        translate: `${shuffledAnswersGlob.translate}`,
        ok: flag,
      },
    ])
  }

  const runCycle = () => {
    if (wordsCount > 0) {
      InCycle.on = true

      isSelectRef.current = false
      isWrongSelectRef.current = false

      setAlive(true)
      wordRef.current.style.animation = "none"
      buttonsRef.current.style.animation = "none"

      setTimeout(() => {
        wordRef.current.style.animation = `fallWord ${speed}s linear`
        buttonsRef.current.style.animation = `appear 2s`
      }, 20)

      wordRef.current.innerHTML = currentWordsPage.page[wordsCount].word
      const answers = [currentWordsPage.page[wordsCount].wordTranslate] || []
      shuffledAnswersGlob.translate =
        currentWordsPage.page[wordsCount].wordTranslate
      shuffledAnswersGlob.word = currentWordsPage.page[wordsCount].word

      for (let index = 0; index < 3; index += 1) {
        answers.push(currentWordsPage.page[random(0, 19)].wordTranslate)
      }
      shuffledAnswersGlob.shufl = shuffle(answers)

      setShuffledAnswers(shuffledAnswersGlob.shufl)
      setTimeout(() => {
        setAlive(false)
        InCycle.on = false

        if (wordRef.current) wordRef.current.innerHTML = ""
        if (!isSelectRef.current || isWrongSelectRef.current) {
          reduceLives()
          setTitle(
            `${currentWordsPage.page[wordsCount].word} - ${currentWordsPage.page[wordsCount].wordTranslate}`
          )
          addWordSToStatistic(false)
        } else setTitle("Savanna")

        if (wordsCount > 0) {
          setWordsCount(wordsCount - 1)
        }
      }, speed * 1000)
    }
  }

  const startGame = () => {
    setIsStartGame(true)
    if (wordsCount >= 0 && InCycle.on === false && life > 0) {
      runCycle()
    }
  }

  const getWordPage = (e) => {
    const group = e.target.value || 0
    setWordGroup(group)
    dispatch(getWordsPageAC(group, random(0, 19)))
  }

  const correctSelect = () => {
    wordRef.current.innerHTML = ""
    correctSound.play()

    addWordSToStatistic(true)
  }

  const wrongSelect = () => {
    wrongSound.play()

    addWordSToStatistic(false)

    isWrongSelectRef.current = true
  }

  useEffect(() => {
    dispatch(getWordsPageAC(wordGroup, random(0, 19)))
  }, [])

  useEffect(() => {
    if (wordsCount >= 0 && isStartGame && InCycle.on === false && life > 0) {
      runCycle()
    }
  }, [wordsCount])

  const keyCompareHandler = (e) => {
    if (
      e.key === "1" ||
      e.key === "2" ||
      e.key === "3" ||
      e.key === "4" ||
      e.key === "4"
    ) {
      if (!isSelectRef.current) {
        isSelectRef.current = true
        if (
          shuffledAnswersGlob.shufl[+e.key - 1].toLowerCase() ===
          shuffledAnswersGlob.translate.toLowerCase()
        ) {
          correctSelect()
        } else {
          wrongSelect()
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keypress", keyCompareHandler)
    return () => {
      document.removeEventListener("keypress", keyCompareHandler)
    }
  }, [])

  const compareHandler = (e) => {
    // todo new functional
    if (!isSelectRef.current) {
      isSelectRef.current = true
      if (
        e.target.innerText.toLowerCase() ===
        shuffledAnswersGlob.translate.toLowerCase()
      ) {
        correctSelect()
      } else {
        wrongSelect()
      }
    }
  }

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
      ref={backRef}
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
        {[...Array(life)].map(() => (
          <img className="mx-0.5 w-6" src={heart} alt="life" />
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

      {/* word div */}
      <div
        ref={wordRef}
        className="-m-32  h-50 w-64  absolute text-2xl text-center"
        style={{ top: "100px", left: "50vw" }}
      >
        {" "}
      </div>

      {/* prop div */}
      <div
        ref={dropRef}
        className="-m-6 h-50 w-12  absolute"
        style={{ top: "200px", left: "50vw" }}
      >
        {" "}
      </div>

      {/* buttons */}
      <div
        ref={buttonsRef}
        className=" animate-appear absolute w-full text-2xl   top-2/3"
      >
        {alive && (
          <div className="text-center">
            {shuffledAnswers.map((el, idx) => (
              <button
                type="button"
                key={`${idx + 1}`}
                className="inline-block bg-white bg-opacity-50 mx-2 px-3 py-1 text-xs font-medium leading-6 text-center text-black
    border-2 border-gray-600 uppercase rounded shadow ripple 
    hover:shadow-lg hover:bg-purple-500 hover:text-white focus:outline-none"
                onClick={compareHandler}
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
