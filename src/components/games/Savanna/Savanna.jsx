/* eslint-disable no-console */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPageActionCreator } from "../../../redux/pages/pages"
import savannaBack from "../../../assets/img/games/savanna_back.jpg"
import lotos from "../../../assets/img/games/lotos_1.png"
import { getWordsPageAC } from "../../../redux/games/games"
import random from "../../../helpers/random"
import forsavanna from "../../../assets/sound/forsavanna.mp3"

const Savanna = () => {
  const [page] = useState({ name: "savanna", showNavbar: false })
  const [isStartGame, setIsStartGame] = useState(false)
  const [wordGroup, setWordGroup] = useState("0")
  const [musicON, setMusicON] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const word = { word: "world" }

  const dispatch = useDispatch()
  dispatch(setPageActionCreator({ page, showNavbar: false }))

  const startGame = () => {
    // setWordGroup
    setIsStartGame(true)
  }

  const getWordPage = (e) => {
    const group = e.target.value || 0
    setWordGroup(group)
    dispatch(getWordsPageAC(group, random(0, 20)))
  }

  useEffect(() => {
    dispatch(getWordsPageAC(wordGroup, random(0, 20)))
  }, [])

  const music = new Audio(forsavanna)

  const musicControlHandler = () => {
    music.loop = true

    if (musicON) {
      music.play()
    } else {
      music.pause()
    }

    setMusicON(!musicON)
  }

  const CurrentWordsPage111 = useSelector(({ wordsPage }) => wordsPage)

  console.log("wordsPage111", CurrentWordsPage111)

  return (
    <div
      className="h-screen w-screen bg-cover   bg-center"
      style={{ backgroundImage: `url(${savannaBack})` }}
    >
      <h1 className="text-5xl text-center pt-8">Savanna</h1>

      <div className="w-1/3  brd p-3 h-30">
        <div className="">
          <div className="">
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select value={wordGroup} onChange={getWordPage}>
              <option value="0">Easy</option>
              <option value="1">Easy+</option>
              <option value="2">Medium</option>
              <option value="3">Medium+</option>
              <option value="4">Difficult</option>
              <option value="5">Difficult+</option>
            </select>

            <button type="button" musicControlHandler={musicControlHandler}>
              music
            </button>
          </div>
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
      <div className="absolute animate-fallWord" style={{ left: "50vw" }}>
        <p className="text-2xl">{word.word}</p>
      </div>
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
