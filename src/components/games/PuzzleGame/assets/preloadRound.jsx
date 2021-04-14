/* eslint-disable */
// import getPages from "../api/getPages"
import getWords from "../api/getWords"
import shuffleArray from "./shuffleArray"
import settingsStored from "../localStorage/settings"
import rawData from "./rawData"

async function makePage(dispatchGame) {
  const pages = {count: 30}
  const pagesCount = (pages.count - 1)
  dispatchGame({ type: 'pages', value: pagesCount })
  return Math.floor((Math.random() * pagesCount) + 1)
}
async function preloadRound(dispatchGame, stateGame, difficulty, page) {
  const sentences = []
  const roundDifficulty = difficulty || stateGame.difficulty
  let pageN = page
  if (!pageN) {
    pageN = await makePage(dispatchGame, roundDifficulty)
    settingsStored.save("puzzle-page", pageN)
  } else {
    makePage(dispatchGame, roundDifficulty)
  }
  let words = await getWords({ page: pageN, group: roundDifficulty - 1 })
  if (Array.isArray(words)) {
    words = shuffleArray(words)
  } else return
  words.forEach((word) => {
    let trimmedWord = word.textExample.replace("<b>", "")
    trimmedWord = trimmedWord.replace("</b>", "")
    sentences.push(trimmedWord.split(" "))
  })
  sentences.forEach((sentence) => {
    sentence.forEach((word, j) => {
      sentence[j] = { text: word, id: j }
    })
  })
  const nextSentence = [...sentences.pop()]
  const newToGuess = shuffleArray(nextSentence)
  const currWordIndex = sentences.length
  dispatchGame({ type: "diff", value: roundDifficulty })
  dispatchGame({ type: "page", value: pageN })
  dispatchGame({ type: "loadWords", value: words })
  dispatchGame({ type: "saveToResult", value: { know: words } })
  dispatchGame({
    type: "loadNextSentence",
    value: {
      newSentences: sentences,
      nextSentence,
      newToGuess,
      currWordIndex,
    },
  })
  let paints = words
  const paint = {
    ...paints[pageN],
    image: rawData({ filename: paints[pageN]?.image, paint: true }),
    cutSrc: rawData({ filename: paints[pageN]?.image, paint: true }),
  }
  dispatchGame({ type: "roundImage", value: paint })
}

export default preloadRound
