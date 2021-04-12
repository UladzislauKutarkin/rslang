import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import cn from "classnames"
import { useDispatch, useSelector } from "react-redux"
import Pagination from "../Pagination"
import AudioComponent from "../AudioComponent"
import Settings from "../Settings"
import { restoreWordBook } from "../../../../redux/wordBook/wordBook"
import Footer from "../../../Footer/Footer"
import { changePage } from "../../../../redux/pagination/pagination"

const WordCard = ({
  handleButtonClick,
  pageNumber,
  userWordsVocabulary,
  group,
  difficulty,
  isStudied,
  isCounter,
  userCounter,
  groupType,
  pageType,
}) => {
  const pages = useSelector(({ pagination }) => pagination.pagesCount)
  const CustomComponent = (item) => (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{ __html: item }} />
  )
  const dispatch = useDispatch()

  const restoreWord = useCallback(
    (id) => () => {
      dispatch(restoreWordBook(id, pageNumber, difficulty, group))
    },
    [difficulty, dispatch, group, pageNumber]
  )

  useEffect(() => {
    if (userWordsVocabulary && userWordsVocabulary.length === 0) {
      dispatch(changePage(pages - 1, pageType))
    }
  }, [dispatch, pageType, pages, userWordsVocabulary])

  return (
    <>
      <div className="flex-auto flex-wrap justify-center m-5">
        <Settings
          groupType={groupType}
          pageType={pageType}
          isSetings={false}
          isStudied={isStudied}
          isCounter={isCounter}
          userCounter={userCounter}
        />
        {userWordsVocabulary?.length === 0 ? (
          <div className="m-20 text-center">
            <div className="p-2">
              <div className="inline-flex items-center bg-white leading-none text-blue-600 rounded-full p-2 shadow text-teal text-sm">
                <span className="inline-flex px-2">
                  В данную группу слова не добавлены
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="container mx-auto mt-20 auto-rows-fr auto-cols-max grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {userWordsVocabulary?.map(({ _id: id, ...item }) => (
                <div
                  key={id}
                  id={id}
                  className={cn(
                    "flex-auto self-stretch items-stretch justify-center",
                    {
                      "border-2 border-red-800 rounded-lg":
                        item?.userWord?.difficulty === "hard",
                    },
                    {
                      "border-2 border-black rounded-lg":
                        item?.userWord?.difficulty === "studied",
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
                          <h3 className="text-2xl font-bold">
                            {item.wordTranslate}
                          </h3>
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
                            audios={[
                              item.audio,
                              item.audioExample,
                              item.audioMeaning,
                            ]}
                          />
                          <div className="mt-10 flex justify-center items-center">
                            <div className="m-6 space-x-5">
                              {isStudied ? (
                                <button
                                  type="button"
                                  className="inline-block bg-purple-600 px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition rounded shadow ripple hover:shadow-lg hover:bg-purple-800 focus:outline-none"
                                  onClick={restoreWord(id)}
                                >
                                  Восстановить
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <Pagination
          countPagination={pages}
          handleClick={handleButtonClick}
          pageNumber={pageNumber}
        />
      </div>
      <Footer />
    </>
  )
}

export default WordCard

WordCard.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  userWordsVocabulary: PropTypes.arrayOf(PropTypes.object),
  group: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  isStudied: PropTypes.bool,
  isCounter: PropTypes.bool,
  userCounter: PropTypes.number,
  groupType: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
}

WordCard.defaultProps = {
  userWordsVocabulary: [],
  isStudied: true,
  isCounter: false,
  userCounter: 0,
}
