import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import cn from "classnames"
import { getVocabulary } from "../../../redux/vocabulary/vocabulary"
import { addWordToWordBook } from "../../../redux/wordBook/wordBook"
import Pragination from "./Pragination"
import AudioComponent from "./AudioComponent"
import Settings from "./Settings"
import { changePage } from "../../../redux/pagination/pagination"

const TextBookPage = () => {
  const dispatch = useDispatch()
  const vocabularyData = useSelector(({ vocabulary }) => vocabulary.vocabulary)
  const group = useSelector(({ pagination }) => pagination.group)
  const pageNumber = useSelector(({ pagination }) => pagination.page)
  const isTranslate = useSelector(({ settings }) => settings.translate)
  const isButtons = useSelector(({ settings }) => settings.buttons)
  const [complicatedWords, setComplicatedWords] = useState([])
  const handleButtonClick = (pageCounter) => {
    dispatch(changePage(pageCounter.selected))
    localStorage.setItem("page", pageCounter.selected)
  }
  useEffect(() => {
    localStorage.setItem("page", pageNumber)
    dispatch(getVocabulary(pageNumber, group))
  }, [pageNumber, group, dispatch])
  const CustomComponent = (item) => (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{ __html: item }} />
  )

  // const ScrollToTopOnMount = () => {
  //   useEffect(() => {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     })
  //   }, [])
  //   return null
  // }

  const deleteWord = useCallback(
    (id) => () => {
      const wordCard = document.getElementById(`${id}`)
      wordCard.classList.add("hidden")
    },
    []
  )

  const addToHardWord = useCallback(
    (wordId) => () => {
      dispatch(addWordToWordBook(wordId))
      if (!complicatedWords.includes(wordId)) {
        setComplicatedWords([...complicatedWords, wordId])
      }
    },
    [complicatedWords, dispatch]
  )

  return (
    <div className="flex-auto flex-wrap justify-center m-5">
      {/* <ScrollToTopOnMount /> */}
      <Settings group={group} />
      <div className="container mx-auto mt-20 auto-rows-fr auto-cols-max grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {vocabularyData.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className={cn(
              "flex-auto self-stretch items-stretch justify-center",
              {
                "border-2 border-red-800 rounded-lg": complicatedWords.includes(
                  item.id
                ),
              }
            )}
          >
            <div>
              <div className="rounded-lg overflow-hidden">
                <div className="relative overflow-hidden pb-60">
                  <img
                    className="absolute h-full w-full object-cover object-center"
                    src={`https://rs-lang-back.herokuapp.com/${item.image}`}
                    alt="img"
                  />
                </div>
                <div
                  className={cn(
                    {
                      "bg-red-200": group === 1,
                    },
                    {
                      "bg-blue-200": group === 0,
                    },
                    {
                      "bg-green-200": group === 2,
                    },
                    {
                      "bg-green-600": group === 3,
                    },
                    {
                      "bg-yellow-200": group === 4,
                    },
                    {
                      "bg-gray-400": group === 5,
                    }
                  )}
                >
                  <div className="py-10 px-8">
                    <h3 className="text-2xl font-bold">{item.word}</h3>
                    {isTranslate && (
                      <h3 className="text-2xl font-bold">
                        {item.wordTranslate}
                      </h3>
                    )}
                    <div className="text-gray-600 text-sm font-medium flex mb-4 mt-2">
                      <p>{item.transcription}</p>
                    </div>
                    <div className="h-72">
                      <p className="leading-7">
                        {CustomComponent(item.textMeaning)}
                      </p>
                      {isTranslate && (
                        <p>{CustomComponent(item.textMeaningTranslate)}</p>
                      )}
                      <p className="leading-7">
                        {CustomComponent(item.textExample)}
                      </p>
                      {isTranslate && (
                        <p>{CustomComponent(item.textExampleTranslate)}</p>
                      )}
                    </div>
                    <AudioComponent
                      audio={item.audio}
                      id={item.id}
                      audioExample={item.audioExample}
                      audioMeaning={item.audioMeaning}
                    />
                    <div className="mt-10 flex justify-center items-center">
                      {isButtons && (
                        <div className="m-6 space-x-5">
                          {["Удалить", "В сложные"].map((el) => (
                            <button
                              // eslint-disable-next-line react/no-array-index-key
                              key={el}
                              type="button"
                              className={cn(
                                "inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none",
                                {
                                  "bg-red-500": el === "Удалить",
                                  "bg-yellow-500 hover:bg-yellow-600":
                                    el !== "Удалить",
                                }
                              )}
                              onClick={
                                el === "Удалить"
                                  ? deleteWord(item.id)
                                  : addToHardWord(item.id)
                              }
                            >
                              {el}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pragination handleClick={handleButtonClick} pageNumber={pageNumber} />
    </div>
  )
}
export default TextBookPage
