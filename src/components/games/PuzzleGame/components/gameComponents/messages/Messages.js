import React, { useContext, useEffect, useState } from "react"
import { storeGame } from "../../storeGame"
import AudioBox from "../audio-box/AudioBox"
import rawData from "../../../assets/rawData"
import styles from "./messages.module.css"

function Messages() {
  const gameState = useContext(storeGame)
  const stateGame = gameState.state
  const [src, setSrc] = useState("")

  useEffect(() => {
    if (
      stateGame.words.length &&
      stateGame.currWordIndex <= stateGame.words.length
    ) {
      const audioSrc = rawData({
        filename:
          stateGame?.words[stateGame?.currWordIndex]?.audioExample ||
          "files/02_0026_example.mp3",
      })

      setSrc(audioSrc)
    }
  }, [stateGame.words, stateGame.currWordIndex])
  return (
    <div className={styles.messages}>
      {(stateGame.hints.audioHint || stateGame.hints.autoAudio) && (
        <div
          className={`${styles.audioPlay} ${
            stateGame.hints.autoAudio && !stateGame.hints.audioHint
              ? "hidden"
              : ""
          }`}
        >
          <AudioBox src={src} />
        </div>
      )}
      {stateGame.hints.transHint && (
        <div className={styles.translation}>
          {stateGame.words[stateGame.currWordIndex] &&
            stateGame.words[stateGame.currWordIndex].textExampleTranslate}
        </div>
      )}
    </div>
  )
}

export default Messages
