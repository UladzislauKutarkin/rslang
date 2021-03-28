/* eslint-disable no-console */
import { useEffect, useState, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPageActionCreator } from "../../../redux/pages/pages"
import savannaBack from "../../../assets/img/games/savanna_back.jpg"
import lotos from "../../../assets/img/games/lotos_1.png"
import { getWordsPageAC } from "../../../redux/games/games"
import random from "../../../helpers/random"
import forsavanna from "../../../assets/sound/forsavanna.mp3"
import { shuffle } from "../../../helpers/shuffle"

// import Counter from "./Counter"

const Savanna = () => {
  const [page] = useState({ name: "savanna", showNavbar: false })
  const [isStartGame, setIsStartGame] = useState(false)
  const [wordGroup, setWordGroup] = useState("0")
  const [musicON, setMusicON] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [wordsCount, setWordsCount] = useState(20)
  // eslint-disable-next-line no-unused-vars
  const [CurrentWordsPage, setCurrentWordsPage] = useState("")
  const [shuffledAnswers, setShuffledAnswers] = useState([])

  const wordRef = useRef()
  console.log("wordRef ", wordRef.current)

  const dispatch = useDispatch()
  dispatch(setPageActionCreator({ page, showNavbar: false }))

  const currentWordsPage = useSelector(({ wordsPage }) => wordsPage.wordsPage)

  console.log("wordsPage", currentWordsPage)

  // eslint-disable-next-line no-unused-vars
  const wordAnimate = () => {
    console.log("wordAnimate")
  }

  const startGame = () => {
    setIsStartGame(true)
    // currentWordsPage.word
    wordRef.current.innerText = currentWordsPage[0].word

    wordRef.current.classList.add("animate-fallWord")

    const answers = [currentWordsPage[0].wordTranslate]
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 3; index++) {
      answers.push(currentWordsPage[0].wordTranslate)
    }
    setShuffledAnswers(shuffle(answers))

    console.log("shuffledAnswers", shuffledAnswers)
    // currentWordsPage.forEach((word) => {
    //   console.log(`${word.word} - ${word.wordTranslate}`)
    // })

    // цикл по словам 1-20

    // вывод падающего слова
    // вывод 4 вариантов

    // нажание на клавишупока палает!
    // угадал +
    // не -
    // к конце результат

    // конец цикла
  }
  const getWordPage = (e) => {
    const group = e.target.value || 0
    setWordGroup(group)
    dispatch(getWordsPageAC(group, random(0, 20)))
  }

  useEffect(() => {
    dispatch(getWordsPageAC(wordGroup, random(0, 20)))
  }, [])

  const music = useMemo(() => new Audio(forsavanna), [])

  const musicControlHandler = () => {
    music.loop = true
    // eslint-disable-next-line no-unused-expressions
    !musicON ? music.play() : music.pause()

    setMusicON(!musicON)
  }

  return (
    <div
      className="h-screen w-screen bg-cover   bg-center"
      style={{ backgroundImage: `url(${savannaBack})` }}
    >
      <h1 className="text-5xl text-center pt-8">Savanna</h1>

      <div className="w-1/3  brd p-3 h-30">
        <div className="">
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            className="focus:border-gray-200 m-2  border-2 border-gray-500 bg-transparent h-full py-2 px-2 pr-7  text-gray-500 sm:text-sm rounded-md"
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
            className="inline-block  mx-2 px-3 py-1 text-xs font-medium leading-6 text-center text-red-500
              border-2 border-red-500 uppercase rounded shadow ripple 
              hover:shadow-lg hover:bg-red-500 hover:text-white focus:outline-none"
            onClick={musicControlHandler}
          >
            Musuc
          </button>
        </div>

        {/* eslint-disable-next-line react/button-has-type */}
        <button
          className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white
         border-2 border-green-800 uppercase transition bg-green-500 rounded shadow ripple 
         hover:shadow-lg hover:bg-green-900 focus:outline-none"
          onClick={startGame}
        >
          start
        </button>
      </div>
      {/* word div */}
      <div ref={wordRef} className="-m-10 absolute text-2xl  left-1/2">
        {" "}
      </div>
      {/* word div */}

      {/* buttons */}
      <div className="absolute w-full text-2xl  top-2/3">
        <div className="text-center">
          {shuffledAnswers.map((el) => (
            <button
              type="button"
              className="inline-block bg-white bg-opacity-50 mx-2 px-3 py-1 text-xs font-medium leading-6 text-center text-black
    border-2 border-gray-600 uppercase rounded shadow ripple 
    hover:shadow-lg hover:bg-red-500 hover:text-white focus:outline-none"
            >
              {el}
            </button>
          ))}
        </div>
      </div>
      {/* buttons */}

      <div className="absolute bottom-10 w-full">
        <img
          className={`${
            isStartGame ? "animate-lotosRotate " : ""
          } mx-auto bottom-10 left-1/2 w-24 h-24`}
          src={lotos}
          alt="lotos"
        />
      </div>
    </div>
  )
}
export default Savanna
