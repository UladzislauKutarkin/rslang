import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faImage,
  faVolumeUp,
  faFileAlt,
  faMusic,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons"
import { AudioPlayerProvider } from "react-use-audio-player"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Game from "./components/gameComponents/Game"
import { StateOfGameProvider } from "./components/storeGame"
import "./sass/puzzleStyles.css"

library.add(faImage, faVolumeUp, faFileAlt, faMusic, faCaretDown)

function EnglishPuzzle() {
  return (
    <div className="appPuzzle">
      <StateOfGameProvider>
        <AudioPlayerProvider>
          <DndProvider backend={HTML5Backend}>
            <Game />
          </DndProvider>
        </AudioPlayerProvider>
      </StateOfGameProvider>
    </div>
  )
}

export default EnglishPuzzle
