import React, { useContext, useEffect, useState } from "react"
import Button from "../../Button"
import { storeGame } from "../../storeGame"
import check from "../../../assets/check"
import continueLevel from "../../../assets/continueLevel"
import nextRound from "../../../assets/nextRound"
import styles from "./bottom-controls.module.css"

function BottomControls() {
  const gameState = useContext(storeGame)
  const dispatchGame = gameState.dispatch
  const stateGame = gameState.state
  const [showResult, setShowResult] = useState(false)

  function handleClick(btn) {
    const buildingSentence = [...stateGame.buildingSentence]
    const currentSentence = [...stateGame.currentSentence]
    const words = [...stateGame.results.know]
    if (btn.isCheck) check(dispatchGame, stateGame, buildingSentence)
    else if (btn.isDontKnow) {
      const word = { ...words[stateGame.currWordIndex] }
      const notKnow = [...stateGame.results.notKnow]
      words.pop()
      notKnow.push(word)
      dispatchGame({ type: "saveToResult", value: { notKnow } })
      dispatchGame({ type: "saveToResult", value: { know: words } })
      dispatchGame({ type: "guessSentence", value: [] })
      check(dispatchGame, stateGame, currentSentence)
    } else if (btn.isContinue) {
      if (stateGame.isRoundFinished) {
        nextRound(dispatchGame, stateGame)
      } else continueLevel(dispatchGame, stateGame)
    } else if (btn.isResults) {
      dispatchGame({ type: "saveToResult", value: { know: words } })
      dispatchGame({ type: "isShowResults", value: true })
    } else if (btn.isCheat) {
      check(dispatchGame, stateGame, currentSentence)
      setTimeout(() => {
        continueLevel(dispatchGame, stateGame)
      }, 100)
    }
  }

  useEffect(() => {
    if (
      stateGame.buildingSentence.length !== stateGame.currentSentence.length
    ) {
      dispatchGame({ type: "sentenceHasMistake", value: null })
    }
  }, [stateGame.buildingSentence, stateGame.currentSentence, dispatchGame])
  useEffect(() => {
    if (stateGame.isRoundFinished !== showResult)
      setShowResult(stateGame.isRoundFinished)
  }, [stateGame.isRoundFinished, showResult])

  return (
    <div className={styles.bottomControls}>
      {!showResult && stateGame.sentenceHasMistake !== false && (
        <Button
          text="Don't know"
          className="dont-btn"
          onClick={() => handleClick({ isDontKnow: true })}
        />
      )}

      {stateGame.checkReady && (
        <Button
          text="Check"
          className="check-btn"
          onClick={() => handleClick({ isCheck: true })}
        />
      )}
      {stateGame.readyToContinue && (
        <Button
          text="Continue"
          className="continue-btn"
          onClick={() => handleClick({ isContinue: true })}
        />
      )}
      {showResult && (
        <Button
          text="Results"
          className="results-btn"
          onClick={() => handleClick({ isResults: true })}
        />
      )}
    </div>
  )
}

export default BottomControls
