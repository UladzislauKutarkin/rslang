import React, { useCallback, useRef, useState } from "react"
import PropTypes from "prop-types"
import ReactAudioPlayer from "react-audio-player"

const AudioComponent = React.memo(({ audios }) => {
  const [playIndex, setPlayIndex] = useState(0)
  const audioPlayer = useRef(null)
  const handleEnd = useCallback(() => {
    if (playIndex < audios.length - 1) {
      setPlayIndex(playIndex + 1)
      audioPlayer?.current?.audioEl?.current.play()
    } else {
      setPlayIndex(0)
    }
  }, [audios.length, playIndex])

  return (
    <ReactAudioPlayer
      className="w-full"
      ref={audioPlayer}
      src={`https://rs-lang-back.herokuapp.com/${audios[playIndex]}`}
      onEnded={handleEnd}
      controls
    />
  )
})

export default AudioComponent

AudioComponent.propTypes = {
  audios: PropTypes.arrayOf(PropTypes.string).isRequired,
}
