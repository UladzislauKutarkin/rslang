/* eslint-disable no-param-reassign */
async function getWords(page, group) {
  page = localStorage.getItem("puzzle-page")
  group = localStorage.getItem("puzzle-difficulty")
  const url = `https://rs-lang-back.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`
  const rawResponse = await fetch(url)
  if (rawResponse.status !== 200) return { error: "Failed to get words" }
  const content = await rawResponse.json()
  return content
}

export default getWords
// ${page}
// ${group}
