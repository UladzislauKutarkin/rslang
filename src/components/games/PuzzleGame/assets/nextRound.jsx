import preloadRound from "./preloadRound"
import calcNext from "./calcNext"
import saveRound from "./saveRound"

async function nextRound(dispatchGame, stateGame, difficulty, page) {
  let roundDifficulty = difficulty
  let nextPage = page
  if (!page && !difficulty) {
    const next = calcNext(stateGame.difficulty, stateGame.page, stateGame.pages)
    roundDifficulty = next.nextDifficulty
    nextPage = next.nextPage
  }
  saveRound(roundDifficulty, nextPage)
  await preloadRound(dispatchGame, stateGame, roundDifficulty, nextPage)
  dispatchGame({ type: "startRound" })
}

export default nextRound
