import React, { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersWords } from "../../../../../redux/wordBook/wordBook"
import WordCard from "../WordCard"
import { getCounterUser } from "../../../../../redux/vocabulary/vocabulary"
import { changePage } from "../../../../../redux/pagination/pagination"

const WordBook = () => {
  const dispatch = useDispatch()
  const userWordsVocabulary = useSelector(({ wordBook }) => wordBook.wordBook)
  const userCounter = useSelector(({ vocabulary }) => vocabulary.counter)
  const pageNumber = useSelector(
    ({ pagination }) => pagination.pageHardVocabulary
  )
  const group = useSelector(({ pagination }) => pagination.groupHardVocabulary)
  useEffect(() => {
    dispatch(getUsersWords(pageNumber, "hard", group))
    dispatch(getCounterUser("hard"))
  }, [dispatch, group, pageNumber])

  const handleButtonClick = useCallback(
    (pageCounter) => {
      dispatch(changePage(pageCounter.selected, "pageHardVocabulary"))
      localStorage.setItem("pageHardVocabulary", pageCounter.selected)
    },
    [dispatch]
  )

  return (
    <>
      <WordCard
        group={group}
        pageType="pageHardVocabulary"
        handleButtonClick={handleButtonClick}
        pageNumber={pageNumber}
        userWordsVocabulary={userWordsVocabulary}
        difficulty="hard"
        isCounter
        userCounter={userCounter}
        groupType="groupHardVocabulary"
      />
    </>
  )
}

export default WordBook
