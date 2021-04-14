import compareSentences from "./compareSentences"

function check(dispatchGame, stateGame, buildingSentence) {
  const currentSentence = [...stateGame.currentSentence]
  const isImageHint = stateGame.hints.imageHint
  const { isSentenceRight, mistakes } = compareSentences(
    currentSentence,
    buildingSentence,
    isImageHint
  )
  dispatchGame({ type: "mistakes", value: mistakes })
  if (isSentenceRight) {
    dispatchGame({ type: "buildingSentence", value: currentSentence })
    dispatchGame({ type: "sentenceHasMistake", value: false })
    dispatchGame({ type: "readyToContinue", value: true })
    dispatchGame({ type: "checkReady", value: false })
  } else {
    dispatchGame({ type: "sentenceHasMistake", value: true })
  }
}

export default check
