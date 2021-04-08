import React, { useContext, useEffect, useState } from "react"
import Hints from "../hints/Hints"
import Select from "../../Select"
import { storeGame } from "../../storeGame"
import nextRound from "../../../assets/nextRound"
import settingsStored from "../../../localStorage/settings"
import styles from "./game-head.module.css"

function GameHeadControls() {
  const gameState = useContext(storeGame)
  const dispatchGame = gameState.dispatch
  const stateGame = gameState.state
  const [pages, setPages] = useState([])
  console.log(pages)

  function handleClick(types) {
    if (types.type === "difficulty") {
      nextRound(dispatchGame, stateGame, types.value, 1)
    } else if (types.type === "page") {
      nextRound(dispatchGame, stateGame, stateGame.difficulty, types.value)
    }
    settingsStored.save(`puzzle-${types.type}`, types.value)
  }
  useEffect(() => {
    if (pages.length !== stateGame.pages) {
      setPages(
        Array(stateGame.pages)
          .fill()
          .map((_, i) => i + 1)
      )
    }
  }, [pages.length, stateGame.pages])

  return (
    <div className={`${styles.gameHeader} game__controls`}>
      <div className={styles.levelControls}>
        <span>Level:</span>
        <Select
          values={[1, 2, 3, 4, 5, 6]}
          value={stateGame.difficulty}
          onChange={(diff) => handleClick({ type: "difficulty", value: diff })}
        />
        <span>Pages:</span>
        <Select
          values={pages}
          value={stateGame.page}
          onChange={(p) => handleClick({ type: "page", value: p })}
        />
      </div>
      <Hints />
    </div>
  )
}

export default GameHeadControls
