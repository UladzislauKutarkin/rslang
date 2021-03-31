import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import WordCard from "../WordCard"
import { getUsersWords } from "../../../../../redux/wordBook/wordBook"

const DeletedWords = () => {
  const [page, setPage] = useState(0)
  const [group, setGroup] = useState(0)
  const [selectedGroup, setSelectedGroup] = useState(0)
  const dispatch = useDispatch()
  const userWordsVocabulary = useSelector(({ wordBook }) => wordBook.wordBook)
  const countPagination = Math.ceil(
    userWordsVocabulary[0]?.totalCount[0]?.count / 20
  )
  useEffect(() => {
    dispatch(getUsersWords(page, "deleted", group))
  }, [dispatch, page, group])

  const handleButtonClick = (pageCounter) => {
    //  dispatch(changePage(pageCounter.selected))
    setPage(pageCounter.selected)
  }
  const handleVocavularyChangeGroup = useCallback(
    (groupIndex) => () => {
      setGroup(groupIndex)
      setSelectedGroup(groupIndex)
      setPage(0)
    },
    []
  )
  return (
    <>
      <WordCard
        group={group}
        handleButtonClick={handleButtonClick}
        countPagination={countPagination}
        page={page}
        userWordsVocabulary={userWordsVocabulary}
        handleVocavularyChangeGroup={handleVocavularyChangeGroup}
        selectedGroup={selectedGroup}
      />
    </>
  )
}
export default DeletedWords
