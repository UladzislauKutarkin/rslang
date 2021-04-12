/* eslint-disable react/no-array-index-key */
import React, { useContext, useState, useEffect } from "react"
import { storeGame } from "../../storeGame"
import Sentence from "../sentence/Sentence"
import styles from "./board.module.css"

function Board() {
  const gameState = useContext(storeGame)
  const stateGame = gameState.state
  const [bg, setBg] = useState(false)

  useEffect(() => {
    setBg(stateGame.roundImage)
  }, [stateGame.roundImage])

  return (
    <div
      className={`${styles.board} ${
        stateGame.isRoundFinished ? styles.finished : ""
      }`}
    >
      {!stateGame.isRoundFinished &&
        stateGame.solvedSentences.length > 0 &&
        stateGame.solvedSentences.map((sentence, j) => (
          <Sentence key={j} index={j} sentence={sentence} isBuilding={false} />
        ))}
      {!stateGame.isRoundFinished && stateGame.buildingSentence && (
        <Sentence
          key={stateGame.solvedSentences.length}
          index={stateGame.solvedSentences.length}
          sentence={stateGame.buildingSentence}
          isBuilding
        />
      )}
      {[...Array(9 - stateGame.solvedSentences.length)].map((_, j) => (
        <div
          className={styles.boardLine}
          key={stateGame.solvedSentences.length + j + 1}
        >
          <span className={styles.boardLineNumber}>
            <i>{stateGame.solvedSentences.length + j + 2}</i>
          </span>
        </div>
      ))}
      {stateGame.isRoundFinished && (
        <div
          className={`${styles.img} ${styles.appear}`}
          style={{
            backgroundImage: `url(${bg.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "863px 460px",
          }}
        >
          <span className={styles.paintName}>
            {`${bg.author} – ${bg.name} ${bg.year}`}
          </span>
        </div>
      )}
      {!stateGame.isRoundFinished && (
        <Sentence
          sentence={stateGame.currentSentence}
          index={10}
          isGuess
          isBuilding={false}
        />
      )}
    </div>
  )
}

export default Board
