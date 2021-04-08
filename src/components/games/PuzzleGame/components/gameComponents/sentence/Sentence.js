/* eslint-disable */
import React, { useContext, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import update from "immutability-helper"
import { useDrop } from "react-dnd"
import { storeGame } from "../../storeGame"
import Word from "../word/Word"
import ItemTypes from "../ItemTypes"
import styles from "./sentence.module.css"

function Sentence(props) {
  const gameState = useContext(storeGame)
  const stateGame = gameState.state
  const dispatchGame = gameState.dispatch
  const [mistakes, setMistakes] = useState([])
  const [width, setWidth] = useState(1)
  const [words, setWords] = useState([])
  const { index } = props
  const vocabularyData = useSelector(({ vocabulary }) => vocabulary.vocabulary)
  console.log(vocabularyData)

  useEffect(() => {
    if (stateGame.sentenceHasMistake !== null && props.isBuilding) {
      setMistakes(stateGame.mistakes)
    } else {
      setMistakes([])
    }
  }, [stateGame.sentenceHasMistake, stateGame.mistakes, props.isBuilding])

  useEffect(() => {
    let { sentence } = props
    if (props.isBuilding) sentence = stateGame.currentSentence
    const wordsArr = []
    sentence.forEach((word) => {
      wordsArr.push(word.text)
    })
    const width = wordsArr.join("").length
    setWidth(width)
  }, [
    props.isBuilding,
    props.isGuess,
    props.sentence,
    stateGame.currentSentence,
  ])

  useEffect(() => {
    if (props.isGuess) setWords(stateGame.guessSentence)
    else setWords(props.sentence)
  }, [props.isGuess, props.sentence, stateGame.guessSentence])

  const removeWord = (index) => {
    setWords(
      update(words, {
        $splice: [[index, 1]],
      })
    )
  }
  const moveWord = (dragIndex, hoverIndex, senIndex) => {
    console.log(senIndex, index, words)
    if (senIndex !== index) {
      return
    }
    const dragCard = words[dragIndex]
    const newWords = update(words, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    })
    setWords(newWords)
    if (senIndex !== 10)
      dispatchGame({ type: "buildingSentence", value: newWords })
    if (senIndex === 10)
      dispatchGame({ type: "guessSentence", value: newWords })
  }
  const renderCard = (word, index) => {
    if (!word) return null
    return (
      <Word
        key={word.id}
        index={index}
        id={word.id}
        sentence={props.sentence}
        sentenceIndex={props.index}
        sentenceWidth={width}
        value={word}
        offset={
          stateGame.offsets[
            props.isGuess ? stateGame.currWordIndex : 9 - props.index
          ]
        }
        buildingWord={props.isBuilding}
        mistake={mistakes.length ? mistakes[index] : null}
        guessWord={props.isGuess}
        canDrag={props.isGuess || props.isBuilding}
        canDrop={props.isGuess || props.isBuilding}
        moveWord={moveWord}
        removeWord={removeWord}
      />
    )
  }
  const [, drop] = useDrop({
    accept: ItemTypes.WORD,
    canDrop: !(props.isGuess || props.isBuilding)
      ? (item, monitor) => {}
      : false,
    drop(item, monitor) {
      if (item.sentenceIndex === 10) {
        console.log(stateGame.guessSentence, item.index)
        if (props.isBuilding) {
          return { changedLine: true }
        }
      }
    },
  })

  return (
    <div className={!props.isGuess ? styles.sentenceContainer : styles.guess}>
      {!props.isGuess && (
        <span
          className={`${styles.boardLineNumber} ${
            props.isBuilding ? styles.current : ""
          }`}
        >
          <i>{props.index + 1}</i>
        </span>
      )}
      <div className={styles.boardLine} ref={drop}>
        {(props.isGuess || props.isBuilding
          ? words
          : [...props.sentence]
        ).map((word, i) => renderCard(word, i))}
      </div>
    </div>
  )
}

export default Sentence
