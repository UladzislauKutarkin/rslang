import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersWords } from "../../../../redux/wordBook/wordBook"
import AudioComponent from "../AudioComponent"

const WordBook = () => {
  const dispatch = useDispatch()
  const userWordsVocabulary = useSelector(({ wordBook }) => wordBook.wordBook)
  useEffect(async () => {
    await dispatch(getUsersWords())
    const kek = userWordsVocabulary[0].map((item) => (
      <div>{item.paginatedResults}</div>
    ))
    console.log(kek)
  }, [dispatch])
  const CustomComponent = (item) => (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{ __html: item }} />
  )

  return (
    <div className="container mx-auto mt-20 auto-rows-fr auto-cols-max grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {userWordsVocabulary.map((item) => (
        <div key={item.id} id={item.id}>
          <div>
            <div className="rounded-lg overflow-hidden">
              <div className="relative overflow-hidden pb-60">
                <img
                  className="absolute h-full w-full object-cover object-center"
                  src={`https://rs-lang-back.herokuapp.com/${item.image}`}
                  alt="img"
                />
              </div>
              <div className="bg-blue-200">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WordBook
