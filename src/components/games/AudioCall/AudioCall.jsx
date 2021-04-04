/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useEffect, useState, useMemo, useRef } from "react"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { onNavbarAC, offNavbarAC } from "../../../redux/games/navbar"
import StatisticsModal from "../gamesComponents/StatisticsModal"

import savannaBack from "../../../assets/img/games/back_audio.jpg"
import heart from "../../../assets/img/games/heart.png"
import spaceship from "../../../assets/img/games/spaceship.png"
import ok from "../../../assets/img/icons/icon_ok.png"
import not from "../../../assets/img/icons/icon_not.png"

import close from "../../../assets/img/icons/icon_close.svg"
import fullscreen from "../../../assets/img/icons/icon_fullscreen.svg"
import speak from "../../../assets/img/icons/icon_speek.svg"

import { getWordsPageAC } from "../../../redux/games/games"
import random from "../../../helpers/random"

import correct from "../../../assets/sound/correct.mp3"
import wrong from "../../../assets/sound/wrong.mp3"

import { shuffle } from "../../../helpers/shuffle"

// eslint-disable-next-line no-unused-vars
const AudioCall = ({ location }) => {
  // console.log("location", location)
  const [isStartGame, setIsStartGame] = useState(false)
  const [wordGroup, setWordGroup] = useState("0")
  const [wordsCount, setWordsCount] = useState(19)
  const [statistics, setStatistics] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState("Audio Call")
  const [life, setLife] = useState(5)
  const [currentWord, setCurrentWord] = useState({
    word: "",
    translate: "",
    shuffled: [],
    isRight: false,
    isWrong: false,
    selected: false,
  })

  const [doGameCycle, setDoGameCycle] = useState(false)

  const backEnd = "https://rs-lang-back.herokuapp.com/"

  const correctSound = useMemo(() => new Audio(correct), [])

  const wrongSound = useMemo(() => new Audio(wrong), [])

  const gameBlockRef = useRef()
  const shipBlockRef = useRef()

  const dispatch = useDispatch()

  const currentWordsPage = useSelector(({ wordsPage }) => wordsPage.wordsPage)

  const gameCycle = () => {
    if (wordsCount > 0) {
      gameBlockRef.current.style.animation = "none"
      setTimeout(() => {
        gameBlockRef.current.style.animation = `spaceInRight 0.8s`
        setDoGameCycle(true)
      }, 20)

      const answers = [currentWordsPage[wordsCount].wordTranslate] || []

      while (answers.length < 5) {
        const candidate = currentWordsPage[random(0, 19)].wordTranslate
        if (!answers.includes(candidate)) {
          answers.push(candidate)
        }
      }

      setCurrentWord({
        ...currentWord,
        word: currentWordsPage[wordsCount].word,
        translate: currentWordsPage[wordsCount].wordTranslate,
        shuffled: shuffle(answers),
        isRight: false,
        isWrong: false,
        selected: false,
      })

      const audio = new Audio(`${backEnd}${currentWordsPage[wordsCount].audio}`)

      setTimeout(() => {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              audio.currentTime = 0
              audio.play()
            })
            .catch((error) => {
              console.log("sound load error", error)
            })
        }
      }, 1000)
    }

    setWordsCount(wordsCount - 1)
  }

  const startGame = () => {
    if (!isStartGame) {
      shipBlockRef.current.style.animation = `spaceOutLeft 2s`
      setTimeout(() => {
        gameCycle()
        setIsStartGame(true)
      }, 1000)
    }
  }

  const getWordPage = (e) => {
    const group = e.target.value || 0
    setWordGroup(group)
    dispatch(getWordsPageAC(group, random(0, 19)))
  }

  const addWordSToStatistic = (flag) => {
    const filtered = statistics.filter((el) => el.word !== currentWord.word)
    setStatistics([
      ...filtered,
      {
        word: `${currentWord.word}`,
        translate: `${currentWord.translate}`,
        ok: flag,
      },
    ])
  }

  const correctSelect = () => {
    if (!currentWord.selected) {
      setCurrentWord({
        ...currentWord,
        isRight: true,
        selected: true,
      })
      addWordSToStatistic(true)
    }
  }
  const wrongSelect = () => {
    if (!currentWord.selected) {
      setCurrentWord({
        ...currentWord,
        isWrong: true,
        selected: true,
      })
      setLife(life - 1)
      addWordSToStatistic(false)
    }
  }

  const compareHandler = (e) => {
    if (!currentWord.selected) {
      if (
        e.target.innerText.toLowerCase() === currentWord.translate.toLowerCase()
      ) {
        correctSelect()
      } else {
        wrongSelect()
      }
    }
  }

  const keyCompareHandler = (e) => {
    if (
      e.key === "1" ||
      e.key === "2" ||
      e.key === "3" ||
      e.key === "4" ||
      e.key === "5"
    ) {
      if (!currentWord.selected) {
        setCurrentWord({ ...currentWord, selected: true })

        console.log("e.key", e.key)
        if (
          currentWord.shuffled[+e.key - 1].toLowerCase() ===
          currentWord.translate.toLowerCase()
        ) {
          correctSelect()
        } else {
          wrongSelect()
        }
      }
    }
  }

  useEffect(() => {
    dispatch(getWordsPageAC(wordGroup, random(0, 19)))
  }, [])

  useEffect(() => {
    document.addEventListener("keypress", keyCompareHandler)
    return () => {
      document.removeEventListener("keypress", keyCompareHandler)
    }
  }, [currentWord])

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
            className="bg-blue-900 focus:border-gray-200 m-2  border-2 border-gray-500  h-full py-2 px-2 pr-7  text-gray-200 sm:text-sm rounded-md"
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
      {!isStartGame && (
        <div ref={shipBlockRef} className=" absolute inset-x-1/4 top-1/3 w-1/2">
          <div className="mx-auto flex justify-center items-center">
            <img className="w-96" src={spaceship} alt="spaceship" />
          </div>
        </div>
      )}

      <div
        ref={gameBlockRef}
        className="absolute   top-1/3  w-2/3"
        style={{ left: "15vw" }}
      >
        {doGameCycle && (
          <>
            {currentWord.selected && (
              <div
                className="text-2xl h-52 text-center text-gray-200"
                style={{ top: "45vw", left: "50vw" }}
              >
                <div
                  className="mx-auto w-60 h-40 rounded-full"
                  style={{
                    backgroundImage: `url(${backEnd}${
                      wordsCount < 19
                        ? currentWordsPage[wordsCount + 1].image
                        : ""
                    })`,
                    backgroundSize: "100%, 100%",
                  }}
                >
                  {" "}
                </div>
                <div className="mt-3 inline-flex items-center">
                  <img className="inline-block h-6" src={speak} alt="speak" />
                  <div className="ml-3 inline-block text-3xl">
                    {currentWord.word}
                  </div>
                </div>
              </div>
            )}
            {!currentWord.selected && (
              <div className="flex justify-center items-center h-52">
                <div className="flex justify-center items-center mx-auto rounded-full bg-white bg-opacity-30 h-20 w-20 text-2xl text-center  border-white text-gray-200 border-2 border-opacity-20">
                  <img className="h-10" src={speak} alt="speak" />
                </div>
              </div>
            )}

            <div className=" mt-10 w-full text-center">
              <div className="inline-flex">
                {currentWord.shuffled.map((el, idx) => (
                  <div key={`${idx + 1}`} className="mx-2">
                    <div className=" inline-flex   justify-center items-center ">
                      {currentWord.isRight &&
                        currentWord.translate.toLowerCase() ===
                          el.toLowerCase() && (
                          <img
                            className="inline-block   align-bottom mx-0.5 w-6 h-6"
                            src={ok}
                            alt="ok"
                          />
                        )}
                      {currentWord.isWrong &&
                        currentWord.translate.toLowerCase() ===
                          el.toLowerCase() && (
                          <img
                            className="inline-block   align-bottom mx-0.5 w-6 h-6"
                            src={not}
                            alt="not"
                          />
                        )}
                      <button
                        type="button"
                        className={`inline-block bg-white bg-opacity-50 mx-2 px-3 py-1 text-xs font-medium leading-6 text-center text-black
border-2 border-gray-600 uppercase rounded shadow ripple ${
                          currentWord.selected
                            ? ""
                            : "hover:shadow-lg hover:bg-purple-500 hover:text-white"
                        }
 focus:outline-none`}
                        onClick={compareHandler}
                      >
                        {el}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <button
                className="inline-block bg-white mt-10 mx-2 px-3 py-1 text-xs font-medium leading-6 text-center text-black
border-2 border-gray-600 uppercase rounded shadow ripple 
hover:shadow-lg hover:bg-purple-500 hover:text-white focus:outline-none"
                type="button"
                onClick={gameCycle}
              >
                Дальше
              </button>
            </div>
          </>
        )}
      </div>
      {/* game block end */}

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
