import React, { useContext } from "react"
import Button from "../Button"
import GameHeadControls from "./game-head/GameHeadControls"
import { storeGame } from "../storeGame"
import BottomControls from "./bottom-controls/BottomControls"
import Board from "./board/Board"
import Messages from "./messages/Messages"
import preloadRound from "../../assets/preloadRound"
import Results from "./results/Results"
import settingsStored from "../../localStorage/settings"
import styles from "./game-main.module.css"
import Puzzle from "../../img/puzzle.svg"

function Game() {
  const gameState = useContext(storeGame)
  const dispatchGame = gameState.dispatch
  const stateGame = gameState.state

  function handleClick(types) {
    const importStore = settingsStored.load()
    if (importStore.isLocalStoreExist) {
      preloadRound(
        dispatchGame,
        stateGame,
        importStore.difficulty,
        importStore.page
      )
    } else preloadRound(dispatchGame, stateGame)
    dispatchGame({ type: "activateHint", value: importStore.hints })
    dispatchGame(types)
  }

  return (
    <div
      className={`${styles.puzzleContainer} ${
        !stateGame.isStarted ? styles.start : ""
      }`}
    >
      {!stateGame.isStarted && (
        <div className={styles.startPuzzle}>
          <img
            className={styles.imagePuzzle}
            src={Puzzle}
            alt="The man pushing puzzles"
          />
          <Button
            text="Collect"
            className={styles.startBtn}
            onClick={() => handleClick({ type: "start" })}
          />
          <p className={styles.buttonDescription}>Push the button to start</p>
          <h3 className={styles.gameName}>English Puzzle</h3>
        </div>
      )}
      {stateGame.isStarted && !stateGame.isEnded && (
        <div className={styles.gameContainer}>
          <GameHeadControls />
          {!stateGame.isRoundFinished && <Messages />}

          {!stateGame.isShowResults && <Board />}

          {stateGame.isShowResults && <Results />}

          {!stateGame.isShowResults && <BottomControls />}
        </div>
      )}
    </div>
  )
}

export default Game
