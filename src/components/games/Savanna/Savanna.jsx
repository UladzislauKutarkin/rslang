/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState, useMemo, useRef } from "react"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"

import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"
// eslint-disable-next-line no-unused-vars
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
import { isAuthorized } from "../../../helpers/globals"

import savannaBack from "../../../assets/img/games/savanna_back.jpg"
import lotos from "../../../assets/img/games/lotos_1.png"
import heart from "../../../assets/img/games/heart.png"
import drop from "../../../assets/img/games/drop.png"

import close from "../../../assets/img/icons/icon_close.svg"
import fullscreen from "../../../assets/img/icons/icon_fullscreen.svg"

import { getWordsPageAC } from "../../../redux/games/games"
import random from "../../../helpers/random"
import forsavanna from "../../../assets/sound/forsavanna.mp3"
import correct from "../../../assets/sound/correct.mp3"
import wrong from "../../../assets/sound/wrong.mp3"

import { shuffle } from "../../../helpers/shuffle"
// import {
//   getUserWord,
//   signThenGetWords,
//   signThenGetWordsThenDelAll,
// } from "../../../api/reqRespTest"

const Savanna = ({ match }) => {
  // signThenGetWordsThenDelAll({ email: "test@test.com", password: "12345678" })

  const referencePage = match.params.reference ?? ""
  const currentGroup = match.params.group ?? 0
  const currentPage = match.params.page ?? 0

  const [referenceFromBook, setReferenceFromBook] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isStartGame, setIsStartGame] = useState(false)

  const [wordGroup, setWordGroup] = useState(2)
  const [musicON, setMusicON] = useState(false)
  const [wordsCount, setWordsCount] = useState(1)
  const [shuffledAnswers, setShuffledAnswers] = useState(["dump"])
  const [statistics, setStatistics] = useState([])
  const [alive, setAlive] = useState(false)
  const [title, setTitle] = useState("")
  const [life, setLife] = useState(5)
  const [startButton, setStartButton] = useState("loading...")

  const wordRef = useRef()
  const dropRef = useRef()
  const buttonsRef = useRef()
  const lotosRef = useRef()
  const isWrongSelectRef = useRef()
  const isSelectRef = useRef()

  const InCycle = useMemo(() => ({ on: false }), [])
  const speed = 5
  const game = "savanna"

  const shuffledAnswersGlob = useMemo(() => ({ shufl: ["test"] }), [])

  const music = useMemo(() => new Audio(forsavanna), [])
  const correctSound = useMemo(() => new Audio(correct), [])
  const wrongSound = useMemo(() => new Audio(wrong), [])
  const dispatch = useDispatch()
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

  // eslint-disable-next-line no-constant-condition
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

  const userCurrent = useSelector(({ user }) => user.user)
  // eslint-disable-next-line no-unused-vars
  const spinner = useSelector(cloneSpinner)

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

  // })

  const addWordSToStatistic = (flag) => {
    const idx = statistics.findIndex((el) => {
      return el.id === shuffledAnswersGlob.id
    })

    if (idx === -1) {
      setStatistics((prev) => [
        ...prev,
        {
          id: shuffledAnswersGlob.id,
          word: shuffledAnswersGlob.word,
          translate: shuffledAnswersGlob.translate,
          right: flag ? 1 : 0,
          wrong: !flag ? 1 : 0,
          ok: flag,
          game,
          status: shuffledAnswersGlob.status,
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
          game,
          status: shuffledAnswersGlob.status,
        }

        return newStat
      })
    }
  }

  const getWordPage = (e) => {
    const group = e.target.value || 0
    setWordGroup(group)
    dispatch(getWordsPageAC(group, random(0, 29)))
  }

  const correctSelect = () => {
    wordRef.current.innerHTML = ""
    correctSound.play()
    const top = wordRef.current.offsetTop
    dropRef.current.style.top = `${top + 50}px`
    dropRef.current.innerHTML = `<img  class= "mx-auto" src = ${drop} alt="drop" width="20">`
    const dropInterval = setInterval(() => {
      dropRef.current.style.top = `${dropRef.current.offsetTop + 27}px`
      if (dropRef.current.offsetTop > lotosRef.current.offsetTop) {
        clearInterval(dropInterval)
        dropRef.current.innerHTML = ""
        lotosRef.current.style.animation = "none"

        setTimeout(() => {
          lotosRef.current.style.animation = `puffEffect 5s`
        }, 20)
      }
    }, 1)

    addWordSToStatistic(true)
  }

  const disappearWord = () => {
    const top = wordRef.current.offsetTop
    wordRef.current.style.animation = "none"
    wordRef.current.style.top = `${top + 135}px`
    setTimeout(() => {
      wordRef.current.style.animation = `disappear 0.5s linear`
    }, 20)
    setTimeout(() => {
      wordRef.current.innerHTML = ""
    }, 400)
  }

  const wrongSelect = () => {
    wrongSound.play()
    disappearWord()
    addWordSToStatistic(false)

    isWrongSelectRef.current = true
  }

  const keyCompareHandler = (e) => {
    if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {
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
  })

  useEffect(() => {
    setWordsCount(() => {
      if (currentWordsPage === undefined || currentWordsPage === null) {
        return 0
      }
      return currentWordsPage.length - 1
    })
  }, [currentWordsPage])

  const musicControlHandler = () => {
    music.loop = true
    // eslint-disable-next-line no-unused-expressions
    !musicON ? music.play() : music.pause()

    setMusicON(!musicON)
  }

  const compareHandler = (e) => {
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

  const reduceLives = () => {
    if (life > 0) {
      setLife((prev) => prev - 1)
    }
  }

  const runCycle = () => {
    if (wordsCount >= 0) {
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

      wordRef.current.innerHTML = currentWordsPage[wordsCount].word ?? ""
      shuffledAnswersGlob.id = currentWordsPage[wordsCount].id
      shuffledAnswersGlob.translate = currentWordsPage[wordsCount].wordTranslate
      shuffledAnswersGlob.word = currentWordsPage[wordsCount].word
      shuffledAnswersGlob.status = currentWordsPage[wordsCount]?.userWord
        ? currentWordsPage[wordsCount].userWord.difficulty
        : "new"

      const answers = [currentWordsPage[wordsCount].wordTranslate] || []

      while (answers.length < 4) {
        if (currentWordsPage.length > 4) {
          const candidate =
            currentWordsPage[random(0, currentWordsPage.length - 1)]
              .wordTranslate
          if (!answers.includes(candidate)) {
            answers.push(candidate)
          }
        } else {
          answers.push("один", "два", "три")
        }
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
            `${currentWordsPage[wordsCount].word} - ${currentWordsPage[wordsCount].wordTranslate}`
          )
        } else setTitle("")

        if (!isSelectRef.current) {
          addWordSToStatistic(false)
        }

        if (wordsCount >= 0) {
          setWordsCount(wordsCount - 1)
        }
      }, speed * 1000)
    }
  }

  useEffect(() => {
    if (wordsCount >= 0 && isStartGame && InCycle.on === false && life > 0) {
      runCycle()
    } else if (wordsCount === -1 || life === 0) {
      SaveStatData()
    }
  }, [wordsCount])

  const startGame = () => {
    if (!spinner) {
      setIsStartGame(true)
      if (wordsCount >= 0 && InCycle.on === false && life > 0) {
        runCycle()
      }
    }
  }

  return (
    <div
      className="h-screen relative w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${savannaBack})` }}
    >
      <h1 className="text-3xl text-center pt-8  hidden  lg:block">{title}</h1>

      <div className=" absolute top-16 left-1  md:left-14">
        {/* <h1 className="5xl brd ">ad {referenceFromBook}</h1> */}
        <div className="">
          {!referenceFromBook && (
            /* eslint-disable-next-line jsx-a11y/no-onchange */
            <select
              className="focus:border-gray-200 m-2  border-2 border-gray-500 bg-transparent h-full py-2 px-2 pr-7  text-gray-800 sm:text-sm rounded-md"
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
            className="inline-block  mx-2 px-3 py-1 text-xs font-medium leading-6 text-center text-red-500
              border-2 border-red-500 uppercase rounded shadow ripple 
              hover:shadow-lg hover:bg-red-500 hover:text-white focus:outline-none"
            onClick={musicControlHandler}
          >
            Мелодия
          </button>
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

      <div className="absolute  flex top-5  right-24">
        {[...Array(life)].map((el, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <img key={idx} className="mx-0.5 w-6" src={heart} alt="life" />
        ))}
      </div>

      {/* exit */}
      <div className="absolute top-5 right-5">
        <Link to="/games/">
          <img className="w-4" src={close} alt="X" />
        </Link>
      </div>

      <div className="absolute top-5 right-14">
        <button type="button" onClick={doFullscreen}>
          <img className="w-6" src={fullscreen} alt="full" />
        </button>
      </div>

      {/* word div */}
      <div
        ref={wordRef}
        className="-m-32 w-64  absolute text-2xl text-center"
        style={{ top: "250px", left: "50vw" }}
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

      {/* lotos */}
      <div ref={lotosRef} className="absolute  bottom-10 w-full">
        <img
          className={`
          ${isStartGame ? "animate-lotosRotate " : ""} 
          mx-auto bottom-10 left-1/2 w-24 h-24`}
          src={lotos}
          alt="lotos"
        />
      </div>
      <StatisticsModal
        show={wordsCount < 0 || !life}
        statistics={statistics}
        setWordsCount={setWordsCount}
        setLife={setLife}
      />
    </div>
  )
}
export default withRouter(Savanna)
Savanna.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.any.isRequired,
}
