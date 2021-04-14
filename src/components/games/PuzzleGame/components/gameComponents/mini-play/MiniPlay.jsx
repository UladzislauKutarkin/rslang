/* eslint-disable react/prop-types */
import React, { useState } from "react"
import ReactAudioPlayer from "react-audio-player"
import Button from "../../Button"
import styles from "./mini-play.module.css"

function MiniPlay({ src }) {
  const [audioElx, setAudioElx] = useState(null)

  function handleClick() {
    audioElx.audioEl.current.play()
  }

  return (
    <div className={styles.miniPlay}>
      <ReactAudioPlayer
        src={src}
        autoPlay={false}
        controls={false}
        ref={(element) => setAudioElx(element)}
      />
      <Button icon="volume-up" onClick={() => handleClick()} />
    </div>
  )
}

export default MiniPlay
