function calcNext(difficulty, page, pages) {
  let nextDifficulty = difficulty
  let nextPage = 1
  if (page < pages) {
    nextPage = page + 1
  } else if (difficulty < 6) {
    nextDifficulty = difficulty + 1
    nextPage = 1
  } else if (difficulty === 6 && page >= pages) {
    nextDifficulty = 1
    nextPage = 1
  }
  return { nextDifficulty, nextPage }
}

export default calcNext
