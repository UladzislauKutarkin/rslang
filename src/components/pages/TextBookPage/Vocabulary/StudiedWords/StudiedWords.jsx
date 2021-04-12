import React, { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStudied } from "../../../../../redux/wordBook/wordBook"
import WordCard from "../WordCard"
import { getCounterUser } from "../../../../../redux/vocabulary/vocabulary"
import { changePage } from "../../../../../redux/pagination/pagination"

//  import { changePage } from "../../../../redux/pagination/pagination"

const StudiedWords = () => {
  const dispatch = useDispatch()
  const userWordsVocabulary = useSelector(({ wordBook }) => wordBook.wordBook)
  const userCounter = useSelector(({ vocabulary }) => vocabulary.counter)
  const pageNumber = useSelector(
    ({ pagination }) => pagination.pageStudiedVocabulary
  )
  useEffect(() => {
    dispatch(getStudied())
    dispatch(getCounterUser("hard"))
  }, [dispatch, pageNumber])

  const handleButtonClick = useCallback(
    (pageCounter) => {
      dispatch(changePage(pageCounter.selected, "pageStudiedVocabulary"))
      localStorage.setItem("pageStudiedVocabulary", pageCounter.selected)
    },
    [dispatch]
  )

  return (
    <>
      <WordCard
        pageType="pageStudiedVocabulary"
        handleButtonClick={handleButtonClick}
        pageNumber={pageNumber}
        userWordsVocabulary={userWordsVocabulary}
        difficulty="hard"
        isStudied={false}
        isCounter
        userCounter={userCounter}
      />
    </>
  )
}

export default StudiedWords
