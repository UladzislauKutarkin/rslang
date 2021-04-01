/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react"
import Game from "./components/Game"
import "./GameApp.css"

class GameApp extends Component {
  constructor() {
    super()
    this.state = {
      currentGameType: "anagram",
    }
  }

  render() {
    return (
      <div className="App">
        <Game currentGameType={this.state.currentGameType} />
      </div>
    )
  }
}

export default GameApp
