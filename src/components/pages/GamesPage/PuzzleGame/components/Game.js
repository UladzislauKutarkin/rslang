/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react"
// import { useSelector } from "react-redux"
import Draggable from "react-draggable"
import { Button, Header } from "semantic-ui-react"
import Constants from "../constants/constants"
import Field from "./Field"
// import VocabularyReducer from "../../../../../redux/vocabulary/vocabulary"
import Permutation from "../utill/shuffle"
import Answer from "./Answer"
import Status from "./AnswerStatus"

const { AnagramDifficulties } = Constants
const { GameModeDescriptions } = Constants
const { TileColors } = Constants
const Word = ["stalpetc", "alex", "vlad"]
// useSelector(({ vocabulary }) => vocabulary.vocabulary)

class Game extends Component {
  constructor() {
    super()
    this.state = {
      answerCode: null,
      phrase: null,
      difficulty: null,
      // eslint-disable-next-line react/no-unused-state
      inGame: false,
      cipheredPhrase: null,
    }
  }

  promptDifficulty() {
    if (this.props.currentGameType === "anagram") {
      let diffList = AnagramDifficulties.map((value) => (
        <Field
          name={value.name}
          desc={value.description}
          isHighlighted={value.group === this.state.difficulty}
          onClick={() => this.changeDifficulty(value.group)}
        />
      ))
      diffList.push(
        <Button color="blue" onClick={() => this.changePhrase(3)}>
          Next Word?
        </Button>
      )
      return diffList
    }
  }

  changeDifficulty(i) {
    if (i !== this.state.difficulty) {
      this.setState(
        {
          difficulty: i,
        },
        () => {
          this.changePhrase(3)
        }
      )
    }
  }

  renderPhrase() {
    if (this.props.currentGameType === "anagram") {
      if (this.state.cipheredPhrase !== null) {
        const len = TileColors.length
        const letterTiles = []
        for (let i = 0; i < this.state.phrase.length; i += 1) {
          letterTiles.push(
            <Draggable bounds="parent">
              <div className={`letter ${TileColors[i % len]}`}>
                {this.state.cipheredPhrase[i]}
              </div>
            </Draggable>
          )
        }
        return letterTiles
      }
    }
  }

  changePhrase(i) {
    if (this.props.currentGameType === "anagram") {
      if (this.state.difficulty !== null) {
        let wordIndex = Math.floor(
          Math.random() * Word[this.state.difficulty].length
        )
        let newPhrase = Word[this.state.difficulty][wordIndex]
        let cipheredPhrase = Permutation(newPhrase)
        //
        console.log(Word[this.state.difficulty][wordIndex])
        //
        this.setState({ answerCode: i }, () => {
          setTimeout(
            () =>
              this.setState({
                phrase: newPhrase,
                cipheredPhrase,
                answerCode: null,
              }),
            2000
          )
        })
      }
    }
  }

  handleSubmit(s) {
    if (this.state.phrase !== null) {
      if (s === this.state.phrase) {
        console.log("Correct!")
        this.changePhrase(1)
      } else {
        console.log("Not quite the word I was looking for...")
        this.setState({ answerCode: 2 }, () => {
          setTimeout(() => this.setState({ answerCode: null }), 2000)
        })
      }
    }
  }

  render() {
    const title = GameModeDescriptions[this.props.currentGameType].title
    const desc = GameModeDescriptions[this.props.currentGameType].desc

    return (
      <div id="main-game">
        <Header as="h1">{title}</Header>
        <Header as="h4">{desc}</Header>
        <div id="difficulties">{this.promptDifficulty()}</div>
        <div
          id="phrase-box"
          className={this.props.currentGameType === "home" ? "no-show" : ""}
        >
          {this.renderPhrase()}
        </div>
        <Answer
          gameType={this.props.currentGameType}
          onSubmit={(e) => this.handleSubmit(e)}
        />
        <Status status={this.state.answerCode} word={this.state.phrase} />
      </div>
    )
  }
}

export default Game
