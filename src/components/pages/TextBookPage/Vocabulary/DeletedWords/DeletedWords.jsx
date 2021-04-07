import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import WordCard from "../WordCard"
import { getUsersWords } from "../../../../../redux/wordBook/wordBook"
import { getCounterUser } from "../../../../../redux/vocabulary/vocabulary"
import { changePage } from "../../../../../redux/pagination/pagination"

const DeletedWords = () => {
  const dispatch = useDispatch()
  const userWordsVocabulary = useSelector(({ wordBook }) => wordBook.wordBook)
  const [restoreWord, setRestoreWord] = useState(true)
  const userCounter = useSelector(({ vocabulary }) => vocabulary.counter)
  const pages = useSelector(({ pagination }) => pagination.pagesCount)
  const pageNumber = useSelector(
    ({ pagination }) => pagination.pageDeletedVocabulary
  )
  const group = useSelector(
    ({ pagination }) => pagination.groupDeletedVocabulary
  )
  // const selectedGroup = useSelector(({ pagination }) => pagination[groupType])

  useEffect(() => {
    localStorage.setItem("pageDeletedVocabulary", pageNumber)
    dispatch(getUsersWords(pageNumber, "deleted", group))
    dispatch(getCounterUser("deleted"))
  }, [dispatch, group, pageNumber])

  const handleButtonClick = useCallback(
    (pageCounter) => {
      dispatch(changePage(pageCounter.selected, "pageDeletedVocabulary"))
      localStorage.setItem("pageDeletedVocabulary", pageCounter.selected)
    },
    [dispatch]
  )

  return (
    <>
      <WordCard
        handleButtonClick={handleButtonClick}
        userWordsVocabulary={userWordsVocabulary}
        // handleVocavularyChangeGroup={handleVocavularyChangeGroup}
        //  selectedGroup={selectedGroup}
        setRestoreWord={setRestoreWord}
        restoredWord={restoreWord}
        difficulty="deleted"
        isCounter
        group={group}
        userCounter={userCounter}
        pages={pages}
        groupType="groupDeletedVocabulary"
        pageType="pageDeletedVocabulary"
        pageNumber={pageNumber}
      />
    </>
  )
}
export default DeletedWords
