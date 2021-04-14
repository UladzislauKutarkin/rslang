/* eslint-disable no-console */
import React, { useEffect, useState, useMemo, useRef } from "react"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"

import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"

import { isAuthorized } from "../../../helpers/globals"

import {
  addWordToWordBook,
  getUsersWords,
} from "../../../redux/wordBook/wordBook"

import {
  getUserWordsVocabulary,
  getVocabulary,
  getCounterUser,
} from "../../../redux/vocabulary/vocabulary"

import { onNavbarAC, offNavbarAC } from "../../../redux/games/navbar"

import StatisticsModal from "../gamesComponents/StatisticsModal"

import sprintBack from "../../../assets/img/games/back_sprint.jpg"

import ok from "../../../assets/img/icons/icon_ok.png"

import not from "../../../assets/img/icons/icon_not.png"
import owl1 from "../../../assets/img/games/owl1.png"
import owl2 from "../../../assets/img/games/owl2.png"
import owl3 from "../../../assets/img/games/owl3.png"

import close from "../../../assets/img/icons/icon_close.svg"
import fullscreen from "../../../assets/img/icons/icon_fullscreen.svg"

import bellSound from "../../../assets/sound/bell-sound.mp3"
import clickSound from "../../../assets/sound/click.mp3"

import { getWordsPageAC } from "../../../redux/games/games"
import random from "../../../helpers/random"

// eslint-disable-next-line no-unused-vars
const Sprint = ({ match }) => {
  const referencePage = match.params.reference ?? ""
  const currentGroup = match.params.group ?? 0
  const currentPage = match.params.page ?? 0

  // eslint-disable-next-line no-unused-vars
  const [referenceFromBook, setReferenceFromBook] = useState(false)
  const [wordGroup, setWordGroup] = useState("0")
  const [wordsCount, setWordsCount] = useState(1)
  const [isRunGame, setIsRunGame] = useState(false)
  const [score, setScore] = useState(0)
  const [startButton, setStartButton] = useState("loading...")

  const [bonus, setBonus] = useState(0)
  const [addToScore, setAddToScore] = useState(10)
  const [canvasSize] = useState({
    width: 100,
    height: 100,
  })

  const [statistics, setStatistics] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState("Sprint")
  // eslint-disable-next-line no-unused-vars
  const [life, setLife] = useState(5)
  const [currentWord, setCurrentWord] = useState({
    id: "",
    word: "",
    translate: "",
    possibleTranslate: "",
    isRight: false,
    isWrong: false,
    selected: false,
    status: "",
    game: "sprint",
  })

  const bell = useMemo(() => new Audio(bellSound), [])
  const click = useMemo(() => new Audio(clickSound), [])

  const timerRef = useRef()
  const choiceRef = useRef()
  // eslint-disable-next-line no-unused-vars
  const reqRef = useRef()
  let canvas = {}

  // eslint-disable-next-line no-unused-vars
  let ctx = {}

  const dispatch = useDispatch()

  // YA insert block start

  let cloneSelector
  let cloneSpinner

  const spinnerFromTextBook = createSelector(
    (state) => state.vocabulary,
    (vocabulary) => vocabulary.isLoading
  )

  const spinnerFromWordBook = createSelector(
    (state) => state.wordBook,
    (wordBook) => wordBook.isLoading
  )

  const selectPageFromTextBook = createSelector(
    (state) => state.vocabulary,
    (vocabulary) => vocabulary.vocabulary
  )

  const selectPageFromWordBook = createSelector(
    (state) => state.wordBook,
    (wordBook) => wordBook.wordBook
  )

  if (referencePage === "textbook") {
    cloneSelector = selectPageFromTextBook
    cloneSpinner = spinnerFromTextBook
  } else if (referencePage === "wordbook" || referencePage === "studied") {
    cloneSelector = selectPageFromWordBook
    cloneSpinner = spinnerFromWordBook
  } else {
    cloneSelector = selectPageFromTextBook
    cloneSpinner = spinnerFromTextBook
  }
  const currentWordsPage = useSelector(cloneSelector)
  const spinner = useSelector(cloneSpinner)

  const userCurrent = useSelector(({ user }) => user.user)

  useEffect(() => {
    setStartButton(() => {
      return spinner ? "Загрузка..." : "Старт"
    })
  }, [spinner])

  // Array.from({ length: 20 }, (_, i) => {
  //   return { word: `word-${i}`, wordTranslate: `translate-${i}` }

  useEffect(() => {
    if (referencePage) {
      setReferenceFromBook(true)
      if (referencePage === "textbook") {
        if (isAuthorized || userCurrent.userId) {
          dispatch(getUserWordsVocabulary(currentPage, currentGroup))
        } else {
          dispatch(getVocabulary(currentPage, currentGroup))
        }
      } else if (referencePage === "wordbook") {
        if (isAuthorized || userCurrent.userId) {
          dispatch(getUsersWords(0, "hard", 0))
        }
      } else if (referencePage === "studied") {
        if (isAuthorized || userCurrent.userId) {
          dispatch(getCounterUser("studied"))
        }
      }
    } else {
      dispatch(getVocabulary(random(0, 29), 0))
    }
  }, [])

  useEffect(() => {
    setWordsCount(() => {
      if (currentWordsPage === undefined || currentWordsPage === null) {
        return 0
      }
      return currentWordsPage.length - 1
    })
  }, [currentWordsPage])

  const addWordSToStatistic = (flag) => {
    const idx = statistics.findIndex((el) => {
      return el.id === currentWord.id
    })

    if (idx === -1) {
      setStatistics((prev) => [
        ...prev,
        {
          id: currentWord.id,
          word: currentWord.word,
          translate: currentWord.translate,
          right: flag ? 1 : 0,
          wrong: !flag ? 1 : 0,
          ok: flag,
          game: currentWord.game,
          status: currentWord.status,
        },
      ])
    } else {
      setStatistics(() => {
        const newStat = statistics
        newStat[idx] = {
          ...statistics[idx],
          right: flag ? statistics[idx].right + 0.5 : statistics[idx].right,
          wrong: !flag ? statistics[idx].wrong + 0.5 : statistics[idx].wrong,
          ok: flag,
          game: currentWord.game,
          status: currentWord.status,
        }

        return newStat
      })
    }
  }

  // eslint-disable-next-line no-unused-vars
  const SaveStatData = async () => {
    if ((isAuthorized || userCurrent.userId) && referencePage === "textbook") {
      const filtered = statistics.filter((el) => el.status !== "hard")
      const { token } = JSON.parse(localStorage.getItem("user"))
      const { userID } = JSON.parse(localStorage.getItem("user"))

      const wordsResponse = await fetch(
        `https://rs-lang-back.herokuapp.com/users/${userID}/words/`,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      const userWords = await wordsResponse.json()

      // eslint-disable-next-line no-restricted-syntax
      for (const statItem of filtered) {
        const wordMatch = userWords.find((item) => item.wordId === statItem.id)
        if (wordMatch === undefined) {
          // eslint-disable-next-line no-await-in-loop
          await dispatch(addWordToWordBook(statItem.id, "studied"))
        }
      }
    }
  }

  // YA insert block end

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
      const possibleTrans = Math.floor(random(0, 1))
        ? currentWordsPage[wordsCount]?.wordTranslate
        : currentWordsPage[random(0, 1)]?.wordTranslate

      setCurrentWord({
        ...currentWord,
        id: currentWordsPage[wordsCount].id,
        word: currentWordsPage[wordsCount].word,
        translate: currentWordsPage[wordsCount].wordTranslate,
        possibleTranslate: possibleTrans,
        isRight: false,
        isWrong: false,
        selected: false,
        status: currentWordsPage[wordsCount]?.userWord
          ? currentWordsPage[wordsCount].userWord.difficulty
          : "new",
      })
    }
    if (wordsCount >= 0) {
      setWordsCount((prevWordCount) => prevWordCount - 1)
    }
  }

  const drawCircle = (time = 60) => {
    canvas = timerRef.current
    ctx = canvas.getContext("2d")
    const ang = { ang: -0.5 * Math.PI, timer: time * 60 }
    const step = (2 * Math.PI) / (time * 60)

    const innerDraw = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height) // clear canvas
      ctx.lineWidth = 10
      ctx.strokeStyle = "#0788b8"
      ctx.beginPath()
      ctx.arc(50, 50, 45, ang.ang, (3 / 2) * Math.PI, false)
      ctx.stroke()
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "#045a79"
      ctx.font = "40px  Arial"
      ctx.fillText(String(Math.round(ang.timer / 60)), 50, 50)

      ang.ang += step

      ang.timer -= 1
      if (ang.timer < 0) {
        setLife(0)
        setBonus(0)
        setIsRunGame(false)
        setWordsCount(() => -1)
        setCurrentWord({
          id: "",
          word: "",
          translate: "",
          possibleTranslate: "",
          isRight: false,
          isWrong: false,
          selected: false,
          status: "",
        })
        if (referencePage) {
          SaveStatData()
        }
        reqRef.current = cancelAnimationFrame(reqRef.current)
        return
      }

      reqRef.current = requestAnimationFrame(innerDraw)
    }
    innerDraw()
  }

  const startGame = () => {
    if (!isRunGame) {
      setScore(0)
      setBonus(0)
      setIsRunGame(true)
      bell.play()
      gameCycle()
      drawCircle()
    }
    ctx.lineWidth = 10
    ctx.strokeStyle = "#0788b8"
  }

  const showChoice = (flag) => {
    if (flag) {
      choiceRef.current.innerHTML = `<img class=" h-16 mx-auto" src="${ok}" alt="ok" />`
    } else
      choiceRef.current.innerHTML = `<img class="h-16 mx-auto" src="${not}" alt="ok" />`
    choiceRef.current.style.animation = "none"
    setTimeout(() => {
      choiceRef.current.style.animation = `showChoice 0.5s`
    }, 20)
    setTimeout(() => {
      choiceRef.current.innerHTML = ""
    }, 500)
  }

  const calculateScore = () => {
    let addTo = 10
    if (bonus >= 9) {
      addTo = 80
    } else if (bonus >= 6 && bonus < 9) {
      addTo = 40
    } else if (bonus >= 3 && bonus < 6) {
      addTo = 20
    } else {
      addTo = 10
    }
    setAddToScore(() => addTo)
    setScore((prev) => prev + addTo)
  }

  const rightHandler = () => {
    if (isRunGame) {
      click.play()

      if (currentWord.translate === currentWord.possibleTranslate) {
        showChoice(true)
        addWordSToStatistic(true)
        setCurrentWord({
          ...currentWord,
          selected: true,
          isRight: true,
        })
        setBonus((prev) => prev + 1)
        calculateScore()
      } else {
        showChoice(false)
        addWordSToStatistic(false)
        setBonus(0)
      }
      if (wordsCount > -1) {
        setTimeout(() => {
          gameCycle()
        }, 500)
      } else {
        reqRef.current = cancelAnimationFrame(reqRef.current)
        setLife(0)
        setScore(0)
        setBonus(0)
        setIsRunGame(false)
        setCurrentWord({
          id: "",
          word: "",
          translate: "",
          possibleTranslate: "",
          isRight: false,
          isWrong: false,
          selected: false,
          status: "",
        })
        if (referencePage) {
          SaveStatData()
        }
      }
    }
  }
  const wrongHandler = () => {
    if (isRunGame) {
      click.play()

      if (currentWord.translate !== currentWord.possibleTranslate) {
        showChoice(true)
        addWordSToStatistic(true)
        setCurrentWord({
          ...currentWord,
          selected: true,
          isWrong: true,
        })
        setBonus((prev) => prev + 1)
        calculateScore()
      } else {
        showChoice(false)
        addWordSToStatistic(false)
        setBonus(0)
      }
      if (wordsCount > -1) {
        setTimeout(() => {
          gameCycle()
        }, 500)
      } else {
        reqRef.current = cancelAnimationFrame(reqRef.current)
        setScore(0)
        setBonus(0)
        setLife(0)
        setIsRunGame(false)
        setCurrentWord({
          word: "",
          translate: "",
          possibleTranslate: "",
          isRight: false,
          isWrong: false,
          selected: false,
        })
      }
    }
  }

  useEffect(() => {
    canvas = timerRef.current
    ctx = canvas.getContext("2d")
    canvas.height = canvasSize.height
    canvas.width = canvasSize.height
    ctx.lineWidth = 10
    ctx.strokeStyle = "#0788b8"
    ctx.beginPath()
    ctx.arc(50, 50, 45, -0.5 * Math.PI, (3 / 2) * Math.PI, false)
    ctx.stroke()
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#045a79"
    ctx.font = "40px  Arial"
    ctx.fillText(String(60), 50, 50)
  }, [])

  useEffect(() => {
    dispatch(getWordsPageAC(wordGroup, random(0, 19)))
  }, [])

  return (
    <div
      className="h-screen  w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${sprintBack})` }}
    >
      <h1 className="text-3xl text-center text-indigo-800 pt-8  hidden  lg:block">
        {title}
      </h1>

      <div className=" absolute top-24 left-1  md:left-10 md:top-20">
        <div>
          {!referenceFromBook && (
            // eslint-disable-next-line jsx-a11y/no-onchange
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
          )}

          <button
            type="button"
            className="inline-block px-10 py-1 mx-2 text-xs font-medium leading-6 text-center text-white
        border-2 border-green-800 uppercase transition bg-green-500 rounded shadow ripple 
        hover:shadow-lg hover:bg-green-900 focus:outline-none"
            onClick={startGame}
          >
            {startButton}
          </button>
        </div>
      </div>

      <div className="absolute  flex top-20 md:top-20 right-24"> </div>

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

      <div
        className=" absolute  justify-end  w-1/3 flex mx-1 top-72 left-0 md:left-20"
        style={{ top: "32vh" }}
      >
        {bonus > 9 && <img className=" h-28" src={owl3} alt="owl3" />}
        {bonus > 6 && <img className=" h-28" src={owl2} alt="owl2" />}
        {bonus > 3 && <img className=" h-28" src={owl1} alt="owl1" />}
      </div>

      <div>
        {isRunGame && (
          <div className="bg-blue-300  absolute top-40 text-center text-3xl right-56 rounded-lg px-4 h-10">
            {<span className="text-xl mr-3"> {`+${addToScore}`}</span>}{" "}
            {<span className=" text-3xl font-bold">{score}</span>}
          </div>
        )}
      </div>

      <canvas
        ref={timerRef}
        className="absolute  top-32 right-20"
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px"`,
        }}
      >
        {" "}
      </canvas>

      <div
        className="bg-white border-2 border-blue-500 bg-opacity-20 absolute top-1/3 h-52 rounded-lg w-1/2"
        style={{ right: "5vw" }}
      >
        <div className="text-center mt-5 text-blue-700 font-bold text-4xl">
          {currentWord.word}
        </div>
        <div className="text-center text-blue-900 font-medium text-3xl">
          {currentWord.possibleTranslate}
        </div>
        <div className="" ref={choiceRef}>
          {" "}
        </div>
      </div>
      <div
        className="absolute  flex justify-center items-center   w-1/2 bottom-1/4"
        style={{ right: "5vw" }}
      >
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
        show={life === 0}
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
  match: PropTypes.any.isRequired,
}
