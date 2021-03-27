/* eslint-disable no-console */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPageActionCreator } from "../../../redux/pages/pages"
import savannaBack from "../../../assets/img/games/savanna_back.jpg"
import lotos from "../../../assets/img/games/lotos_1.png"
import { getWordsPageAC } from "../../../redux/games/games"

const Savanna = () => {
  const [page] = useState({ name: "savanna", showNavbar: false })
  const [isStartGame, setIsStartGame] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const word = { word: "world" }

  const dispatch = useDispatch()
  dispatch(setPageActionCreator({ page, showNavbar: false }))

  const startGame = () => {
    setIsStartGame(true)
  }

  useEffect(() => {
    dispatch(getWordsPageAC())
  }, [])

  const wordsPage111 = useSelector(({ wordsPage }) => wordsPage)

  console.log("wordsPage111", wordsPage111)

  return (
    <div
      className="h-screen w-screen bg-cover   bg-center"
      style={{ backgroundImage: `url(${savannaBack})` }}
    >
      <h1 className="text-5xl text-center pt-8">Savanna</h1>
      <div className="w-1/3  brd p-3 h-30">
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
