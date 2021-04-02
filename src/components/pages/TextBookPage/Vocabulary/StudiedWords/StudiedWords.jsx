import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStudied } from "../../../../../redux/wordBook/wordBook"
import WordCard from "../WordCard"
import { getCounterUser } from "../../../../../redux/vocabulary/vocabulary"

//  import { changePage } from "../../../../redux/pagination/pagination"

const StudiedWords = () => {
  const [page, setPage] = useState(0)
  const [group, setGroup] = useState(0)
  const [selectedGroup, setSelectedGroup] = useState(0)
  const dispatch = useDispatch()
  const userWordsVocabulary = useSelector(({ wordBook }) => wordBook.wordBook)
  const userCounter = useSelector(({ vocabulary }) => vocabulary.counter)
  const countPagination = Math.ceil(
    userWordsVocabulary[0]?.totalCount[0]?.count / 20
  )
  useEffect(() => {
    dispatch(getStudied("hard"))
    dispatch(getCounterUser("hard"))
  }, [dispatch, group, page])

  const handleButtonClick = (pageCounter) => {
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
        difficulty="hard"
        isStudied={false}
        isCounter
        userCounter={userCounter}
      />
    </>
  )
}

export default StudiedWords
