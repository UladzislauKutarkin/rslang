import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import WordCard from "../WordCard"
import { getUsersWords } from "../../../../../redux/wordBook/wordBook"

const DeletedWords = () => {
  const [page, setPage] = useState(0)
  const dispatch = useDispatch()
  const userWordsVocabulary = useSelector(({ wordBook }) => wordBook.wordBook)
  const countPagination = Math.ceil(
    userWordsVocabulary[0]?.totalCount[0]?.count / 20
  )
  useEffect(() => {
    dispatch(getUsersWords(page, "deleted"))
  }, [dispatch, page])

  const handleButtonClick = (pageCounter) => {
    //  dispatch(changePage(pageCounter.selected))
    setPage(pageCounter.selected)
  }
  // const handleChangeGroup = useCallback(
  //   (group) => () => {
  //     dispatch(changeGroup(group))
  //     localStorage.setItem("group", group)
  //     dispatch(changePage(0))
  //   },
  //   [dispatch]
  // )

  return (
    <>
      <WordCard
        handleButtonClick={handleButtonClick}
        countPagination={countPagination}
        page={page}
        userWordsVocabulary={userWordsVocabulary}
      />
    </>
  )
}
export default DeletedWords
