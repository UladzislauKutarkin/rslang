import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { onNavbarAC } from "../../../redux/games/navbar"
import savannaPromo from "../../../assets/img/games/savanna_promo.jpg"
import audioPromo from "../../../assets/img/games/audio_promo.jpg"
import sprintPromo from "../../../assets/img/games/sprint_promo.jpg"
import puzzlePromo from "../../../assets/img/games/puzzle_promo.jpg"
import Footer from "../../Footer/Footer"

const GamesPage = () => {
  const dispatch = useDispatch()
  dispatch(onNavbarAC())
  if (document.fullscreenElement) {
    document.exitFullscreen()
  }

  return (
    <>
      <div className=" w-full md:px-16 lg:px-32 mb-10">
        <div className=" mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ">
          {/* card  */}
          <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 max-w-lg flex max-h-96 m-4 md:m-6 rounded-lg hover:bg-indigo-100">
            <div className="  relative group sm:w-full md:w-1/2   rounded-lg">
              <h1
                className="pl-4 md:pl-8 mt-6 md:mt-8 text-2xl text-white font-serif transform group-hover:translate-x-6
         duration-300 uppercase leading-snug"
              >
                САВАННА <br />
              </h1>
              <h3 className="pl-4 md:pl-8 mt-6 text-white text-xl">
                Развиваем <br /> словарный запас
              </h3>
              <br />
              <p className="pl-4 md:pl-8 mt-6 text-white">
                Необходимо выбрать <br />
                правильный <br />
                перевод слова
              </p>
              <div className="absolute z-50 bottom-32 md:bottom-10 right-0 transform translate-x-12 flex items-center justify-center w-20 h-20 rounded-full bg-white group-hover:bg-green-500 text-indigo-800 group-hover:text-white font-semibold cursor-pointer group-hover:scale-110 duration-500 select-none">
                <Link to="/savanna">Вперед</Link>
              </div>
            </div>
            <div className="md:w-1/2  md:block ">
              <img
                src={savannaPromo}
                alt="savannaPromo"
                className="max-h-96 rounded-lg"
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 max-w-lg flex max-h-96 m-4 md:m-6 rounded-lg hover:bg-indigo-100">
            <div className="  relative group sm:w-full md:w-1/2   rounded-lg">
              <h1
                className="pl-4 md:pl-8 mt-6 md:mt-8 text-2xl text-white font-serif transform group-hover:translate-x-6
         duration-300 uppercase leading-snug"
              >
                АУДИОВЫЗОВ <br />
              </h1>
              <h3 className="pl-4 md:pl-8 mt-6 text-white text-xl">
                Развиваем <br /> словарный запас
              </h3>
              <br />
              <p className="pl-4 md:pl-8 mt-6 text-white">
                Выбираем слово <br />
                по <br />
                произнощению
              </p>
              <div className="absolute z-50 bottom-32 md:bottom-10 right-0 transform translate-x-12 flex items-center justify-center w-20 h-20 rounded-full bg-white group-hover:bg-green-500 text-indigo-800 group-hover:text-white font-semibold cursor-pointer group-hover:scale-110 duration-500 select-none">
                <Link to="/audiocall">Вперед</Link>
              </div>
            </div>
            <div className="md:w-1/2  md:block ">
              <img
                src={audioPromo}
                alt="audioPromo"
                className="max-h-96 rounded-lg"
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 max-w-lg flex max-h-96 m-4 md:m-6 rounded-lg hover:bg-indigo-100">
            <div className="  relative group sm:w-full md:w-1/2   rounded-lg">
              <h1
                className="pl-4 md:pl-8 mt-6 md:mt-8 text-2xl text-white font-serif transform group-hover:translate-x-6
         duration-300 uppercase leading-snug"
              >
                СПРИНТ <br />
              </h1>
              <h3 className="pl-4 md:pl-8 mt-6 text-white text-xl">
                Упражнение <br />
                на время
              </h3>
              <br />
              <p className="pl-4 md:pl-8 mt-6 text-white">
                Необходимо подтветдить <br />
                верность <br /> предоставленного <br />
                перевода слова
              </p>
              <div className="absolute z-50 bottom-32 md:bottom-10 right-0 transform translate-x-12 flex items-center justify-center w-20 h-20 rounded-full bg-white group-hover:bg-green-500 text-indigo-800 group-hover:text-white font-semibold cursor-pointer group-hover:scale-110 duration-500 select-none">
                <Link to="/sprint">Вперед</Link>
              </div>
            </div>
            <div className="md:w-1/2  md:block ">
              <img
                src={sprintPromo}
                alt="sprintPromo"
                className="max-h-96 rounded-lg"
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 max-w-lg flex max-h-96 m-4 md:m-6 rounded-lg hover:bg-indigo-100">
            <div className="  relative group sm:w-full md:w-1/2   rounded-lg">
              <h1
                className="pl-4 md:pl-8 mt-6 md:mt-8 text-2xl text-white font-serif transform group-hover:translate-x-6
         duration-300 uppercase leading-snug"
              >
                Своя игра <br />
              </h1>
              <h3 className="pl-4 md:pl-8 mt-6 text-white text-xl">
                Развиваем <br /> словарный запас
              </h3>
              <br />
              <p className="pl-4 md:pl-8 mt-6 text-white">
                Необходимо собрать <br />
                слово <br />
                из букв
              </p>
              <div className="absolute z-50 bottom-32 md:bottom-10 right-0 transform translate-x-12 flex items-center justify-center w-20 h-20 rounded-full bg-white group-hover:bg-green-500 text-indigo-800 group-hover:text-white font-semibold cursor-pointer group-hover:scale-110 duration-500 select-none">
                <Link to="/puzzle">Вперед</Link>
              </div>
            </div>
            <div className="md:w-1/2  md:block ">
              <img
                src={puzzlePromo}
                alt="puzzlePromo"
                className="max-h-96 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default GamesPage
