import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersWords } from "../../../../../redux/wordBook/wordBook"
import WordCard from "../WordCard"
import { getCounterUser } from "../../../../../redux/vocabulary/vocabulary"
import { changePage } from "../../../../../redux/pagination/pagination"

//  import { changePage } from "../../../../redux/pagination/pagination"

const WordBook = () => {
  const [group, setGroup] = useState(0)
  const [selectedGroup, setSelectedGroup] = useState(0)
  const dispatch = useDispatch()
  const userWordsVocabulary = useSelector(({ wordBook }) => wordBook.wordBook)
  const userCounter = useSelector(({ vocabulary }) => vocabulary.counter)
  const pageNumber = useSelector(
    ({ pagination }) => pagination.pageHardVocabulary
  )
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

  const handleVocavularyChangeGroup = useCallback(
    (groupIndex) => () => {
      setGroup(groupIndex)
      setSelectedGroup(groupIndex)
    },
    []
  )
  return (
    <>
      <WordCard
        group={group}
        pageType="pageHardVocabulary"
        handleButtonClick={handleButtonClick}
        pageNumber={pageNumber}
        userWordsVocabulary={userWordsVocabulary}
        handleVocavularyChangeGroup={handleVocavularyChangeGroup}
        selectedGroup={selectedGroup}
        difficulty="hard"
        isCounter
        userCounter={userCounter}
      />
    </>
  )
}

export default WordBook
