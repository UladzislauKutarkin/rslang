/* eslint-disable */
import React, { useEffect, useState, useContext } from "react"
import { useAudioPlayer } from "react-use-audio-player"
import Button from "../../Button"
import { storeGame } from "../../storeGame"
import styles from "./audio-box.module.css"

function AudioBox({ src }) {
  const gameState = useContext(storeGame)
  const stateGame = gameState.state
  const [sourceSrc, setSourceSrc] = useState(src)
  const [afterPlay, setAfterPlay] = useState(false)
  const { ready, loading, playing, load, play, stop } = useAudioPlayer({
    src: sourceSrc,
    format: "mp3",
    autoplay: false,
  })

  function handleClick() {
    if (ready) {
      stop()
      play()
    }
  }
  useEffect(() => {
    if (!loading && !ready) {
      load(sourceSrc)
    }
  }, [sourceSrc, loading, load, ready])
  useEffect(() => {
    setSourceSrc(src)
    if (sourceSrc !== src) setAfterPlay(false)
  }, [src, sourceSrc])
  useEffect(() => {
    if (
      stateGame.hints.autoAudio &&
      stateGame.readyToContinue &&
      ready &&
      !playing &&
      stateGame.sentenceHasMistake === false &&
      !afterPlay
    ) {
      stop()
      play()
      setAfterPlay(true)
    }
  }, [
    afterPlay,
    play,
    playing,
    ready,
    stateGame.hints.autoAudio,
    stateGame.readyToContinue,
    stateGame.sentenceHasMistake,
    stop,
  ])

  return (
    <>
      <Button
        icon="volume-up"
        className={`${styles.audioBoxBtn} ${loading ? styles.loading : ""} ${
          playing ? styles.playing : ""
        }`}
        onClick={() => handleClick()}
      />
    </>
  )
}

export default AudioBox
