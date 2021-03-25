import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVocabulary } from "../../../redux/vocabulary/vocabulary"
import Pragination from "./Pragination"
import AudioComponent from "./AudioComponent"
import Button from "../../Button"
import Settings from "./Settings"

const TextBookPage = () => {
  const [page, setPage] = useState(0)
  const dispatch = useDispatch()
  const vocabularyData = useSelector(({ vocabulary }) => vocabulary.vocabulary)
  const [group, setGroup] = useState(0)

  const getPages = () => {
    if (localStorage.getItem("page") === "") {
      setPage("0")
    } else {
      setPage(localStorage.getItem("page"))
    }
  }

  useEffect(() => {
    getPages()
    dispatch(getVocabulary(page, group))
  }, [page, group, dispatch])

  const handleButtonClick = (pageCounter) => {
    setPage(pageCounter.selected)
    localStorage.setItem("page", page)
  }

  const handleGroupClick = (e) => {
    setGroup(+e.target.dataset.page - 1)
    localStorage.setItem("group", group)
  }

  const CustomComponent = (item) => (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: item }} />
  )

  const ScrollToTopOnMount = () => {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, [])
    return null
  }

  return (
    <div className="flex-auto flex-wrap justify-center m-5">
      <ScrollToTopOnMount />
      <Settings group={group} handleGroupClick={handleGroupClick} />
      <div className="container mx-auto mt-20 auto-rows-fr auto-cols-max grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {vocabularyData.map((item) => (
          <div className="flex-auto  self-stretch items-stretch justify-center">
            <div>
              <div className="rounded-lg overflow-hidden">
                <div className="relative overflow-hidden pb-60">
                  <img
                    className="absolute h-full w-full object-cover object-center"
                    src={`https://rs-lang-back.herokuapp.com/${item.image}`}
                    alt=""
                  />
                </div>
                <div className="relative bg-blue-200">
                  <div className="py-10 px-8">
                    <h3 className="text-2xl font-bold">{item.word}</h3>
                    <h3 className="text-2xl font-bold">{item.wordTranslate}</h3>
                    <div className="text-gray-600 text-sm font-medium flex mb-4 mt-2">
                      <p>{item.transcription}</p>
                    </div>
                    <div className="h-72">
                      <p className="leading-7">
                        {CustomComponent(item.textMeaning)}
                      </p>
                      <p>{CustomComponent(item.textMeaningTranslate)}</p>
                      <p className="leading-7">
                        {CustomComponent(item.textExample)}
                      </p>
                      <p>{CustomComponent(item.textExampleTranslate)}</p>
                    </div>
                    <AudioComponent
                      audio={item.audio}
                      id={item.id}
                      audioExample={item.audioExample}
                      audioMeaning={item.audioMeaning}
                    />
                    <div className="mt-10 flex justify-center items-center">
                      <div className="m-6 space-x-5">
                        <Button
                          className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
                          name="Удалить"
                        />
                        <Button
                          className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-yellow-500 rounded shadow ripple hover:shadow-lg hover:bg-yellow-600 focus:outline-none"
                          name="В сложные"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pragination handleClick={handleButtonClick} />
    </div>
  )
}
export default TextBookPage
