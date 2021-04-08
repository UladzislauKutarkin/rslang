import shuffleArray from "./shuffleArray"
import calcNext from "./calcNext"
import saveRound from "./saveRound"

function continueLevel(dispatchGame, stateGame) {
  if (!stateGame.sentenceHasMistake) {
    const currentSentence = [...stateGame.currentSentence]
    const solvedSentences = [...stateGame.solvedSentences]
    solvedSentences.push(currentSentence)
    dispatchGame({ type: "solvedSentences", value: solvedSentences })
    const { sentences } = stateGame
    if (sentences.length > 0) {
      const nextSentence = [...sentences.pop()]
      const newToGuess = shuffleArray(nextSentence)
      const currWordIndex = sentences.length
      dispatchGame({
        type: "loadNextSentence",
        value: {
          newSentences: sentences,
          nextSentence,
          newToGuess,
          currWordIndex,
        },
      })
    } else {
      const next = calcNext(
        stateGame.difficulty,
        stateGame.page,
        stateGame.pages
      )
      saveRound(next.nextDifficulty, next.nextPage)
      dispatchGame({ type: "finishRound" })
    }
  }
}

export default continueLevel
