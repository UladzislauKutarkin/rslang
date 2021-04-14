import React, { useContext } from "react"
import Button from "../../Button"
import { storeGame } from "../../storeGame"
import styles from "./hints.module.css"

function Hints() {
  const gameState = useContext(storeGame)
  const dispatchGame = gameState.dispatch
  const stateGame = gameState.state

  function handleClick(value) {
    dispatchGame({ type: "activateHint", value })
  }

  return (
    <div className={styles.gameHints}>
      <Button
        icon="file-alt"
        className={`${styles.hintBtn} ${
          stateGame.hints.transHint ? styles.active : ""
        }`}
        onClick={() => handleClick({ transHint: !stateGame.hints.transHint })}
      />
      <Button
        icon="music"
        className={`${styles.hintBtn} ${
          stateGame.hints.audioHint ? styles.active : ""
        }`}
        onClick={() => handleClick({ audioHint: !stateGame.hints.audioHint })}
      />
      <Button
        icon="image"
        className={`${styles.hintBtn} ${
          stateGame.hints.imageHint ? styles.active : ""
        }`}
        onClick={() => handleClick({ imageHint: !stateGame.hints.imageHint })}
      />
    </div>
  )
}

export default Hints
