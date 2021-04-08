/* eslint-disable react/no-danger */
import React, { useContext, useEffect, useState } from "react"
import { storeGame } from "../../storeGame"
import rawData from "../../../assets/rawData"
import Button from "../../Button"
import nextRound from "../../../assets/nextRound"
import MiniPlay from "../mini-play/MiniPlay"
import styles from "./results.module.css"

function Results() {
  const gameState = useContext(storeGame)
  const dispatchGame = gameState.dispatch
  const stateGame = gameState.state
  const [bg, setBg] = useState(false)

  useEffect(() => {
    setBg(stateGame.roundImage)
  }, [stateGame.roundImage])

  function handleClick(btn) {
    if (btn.isContinue) {
      nextRound(dispatchGame, stateGame)
    }
  }

  return (
    <div className={styles.resultsWindow}>
      <div className={styles.results}>
        <img className={styles.resultsImg} src={bg.imageSrc} alt={bg.name} />
        <span>{`${bg.author} – ${bg.name} ${bg.year}`}</span>
        <div className="results__dont-know">
          <h4>
            I don&apos;t know
            <span className={styles.numberRed}>
              {stateGame.results.notKnow.length}
            </span>
          </h4>
          {stateGame.results.notKnow.map((wordSentence) => (
            <span className={styles.resultSent}>
              <MiniPlay
                src={rawData({ filename: wordSentence.audioExample })}
              />
              <div
                dangerouslySetInnerHTML={{ __html: wordSentence.textExample }}
              />
            </span>
          ))}
        </div>
        <div className="results__i-know">
          <h4>
            I know
            <span className={styles.numberGreen}>
              {stateGame.results.know.length}
            </span>
          </h4>
          {stateGame.results.know.map((wordSentence) => (
            <span className={styles.resultSent}>
              <MiniPlay
                src={rawData({ filename: wordSentence.audioExample })}
              />
              <div
                dangerouslySetInnerHTML={{ __html: wordSentence.textExample }}
              />
            </span>
          ))}
        </div>
      </div>
      <div className={styles.resultsBtns}>
        <Button
          className="btn"
          text="Continue"
          onClick={() => handleClick({ isContinue: true })}
        />
        <Button className="btn" text="Statistic" />
      </div>
    </div>
  )
}

export default Results
