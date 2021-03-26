import React from 'react';

import ReactAudioPlayer from "react-audio-player";

export const AudioComponent = React.memo(({audio, id, audioMeaning, audioExample})=>{
    let counter =0;

    const handleEnded = (isEnded, firstAudio, secondAudio, thirdAudio) =>{
        const audios =[firstAudio, secondAudio, thirdAudio]
        const audio = document.getElementById(`${isEnded}`)
        counter++
        if(counter >= audios.length) {
            audio.src= `https://rs-lang-back.herokuapp.com/${audios[0]}`
            counter=0
        } else {
            console.log(audios[counter])
            audio.src= `https://rs-lang-back.herokuapp.com/${audios[counter]}`
            audio.play()
        }
    }
    return (
        <ReactAudioPlayer
            src={`https://rs-lang-back.herokuapp.com/${audio}`}
            onEnded={()=>{
            handleEnded(id, audio, audioMeaning, audioExample)
            }
            }
            id={id}
            controls
            />
    )
})