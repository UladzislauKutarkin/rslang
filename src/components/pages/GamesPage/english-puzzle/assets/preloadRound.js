/* eslint-disable no-param-reassign */
import getPages from "../api/getPages"
import getWords from "../api/getWords"
import shuffleArray from "./shuffleArray"
import settingsStored from "../localStorage/settings"
import paintings1 from "../paints/level1"
import paintings2 from "../paints/level2"
import paintings3 from "../paints/level3"
import paintings4 from "../paints/level4"
import paintings5 from "../paints/level5"
import paintings6 from "../paints/level6"
import rawData from "./rawData"

async function makePage(dispatchGame, roundDifficulty) {
  const pages = await getPages({ group: roundDifficulty - 1 })
  const pagesCount = pages.count - 1
  dispatchGame({ type: "pages", value: pagesCount })
  return Math.floor(Math.random() * pagesCount + 1)
}
async function preloadRound(dispatchGame, stateGame, difficulty, page) {
  const sentences = []
  const roundDifficulty = difficulty || stateGame.difficulty
  let pageN = page
  if (!pageN) {
    pageN = await makePage(dispatchGame, roundDifficulty)
    settingsStored.save("puzzle-page", 1)
  } else {
    makePage(dispatchGame, roundDifficulty)
  }
  let words = await getWords({ page: pageN, group: roundDifficulty - 1 })
  if (Array.isArray(words)) {
    words = shuffleArray(words)
    console.log(words)
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
  let paints = paintings1
  if (roundDifficulty === 2) paints = paintings2
  else if (roundDifficulty === 3) paints = paintings3
  else if (roundDifficulty === 4) paints = paintings4
  else if (roundDifficulty === 5) paints = paintings5
  else if (roundDifficulty === 6) paints = paintings6
  const paint = {
    ...paints[pageN],
    image: rawData({ filename: paints[pageN].image, paint: true }),
    cutSrc: rawData({ filename: paints[pageN].cutSrc, paint: true }),
  }
  dispatchGame({ type: "roundImage", value: paint })
}

export default preloadRound
