import React from "react"
import PropTypes from "prop-types"
import ReactAudioPlayer from "react-audio-player"

const AudioComponent = React.memo(
  ({ audio, id, audioMeaning, audioExample }) => {
    let counter = 0

    const handleEnded = (isEnded, firstAudio, secondAudio, thirdAudio) => {
      const audios = [firstAudio, secondAudio, thirdAudio]
      const audioFile = document.getElementById(`${isEnded}`)
      counter += 1
      if (counter >= audios.length) {
        audioFile.src = `https://rs-lang-back.herokuapp.com/${audios[0]}`
        counter = 0
      } else {
        audioFile.src = `https://rs-lang-back.herokuapp.com/${audios[counter]}`
        audioFile.play()
      }
    }
    return (
      <ReactAudioPlayer
        src={`https://rs-lang-back.herokuapp.com/${audio}`}
        onEnded={() => {
          handleEnded(id, audio, audioMeaning, audioExample)
        }}
        id={id}
        controls
      />
    )
  }
)

export default AudioComponent

AudioComponent.propTypes = {
  audio: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  audioMeaning: PropTypes.string.isRequired,
  audioExample: PropTypes.string.isRequired,
}
