/* eslint-disable */
import React, { createContext, useReducer } from "react"
import createOffsets from "../assets/createOffsets"
import settingsStored from "../localStorage/settings"

const initialState = {
  isStarted: false,
  isEnded: false,
  isRoundFinished: false,
  difficulty: 1,
  page: 1,
  pages: 0,
  level: 1,
  sentences: [],
  solvedSentences: [],
  currentSentence: [],
  buildingSentence: [],
  guessSentence: [],
  checkReady: false,
  sentenceHasMistake: null,
  mistakes: [],
  readyToContinue: false,
  hints: {
    transHint: false,
    imageHint: false,
    audioHint: false,
    autoAudio: false,
  },
  words: [],
  currWordIndex: 9,
  offsets: [],
  roundImage: {},
  isShowResults: false,
  results: { know: [], notKnow: [] },
}
const storeGame = createContext(initialState)
const { Provider } = storeGame

const StateOfGameProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let newState
    switch (action.type) {
      case "start":
        newState = { ...state, isStarted: true }
        return newState
      case "loadWords":
        newState = {
          ...state,
          words: action.value,
          offsets: createOffsets(action.value),
        }
        return newState
      case "end":
        newState = { ...state, isEnded: true }
        return newState
      case "diff":
        newState = { ...state, difficulty: action.value }
        return newState
      case "pages":
        newState = { ...state, pages: action.value }
        return newState
      case "page":
        newState = { ...state, page: action.value }
        return newState
      case "sentences":
        newState = { ...state, sentences: action.value }
        return newState
      case "currentSentence":
        newState = { ...state, currentSentence: action.value }
        return newState
      case "buildingSentence":
        newState = { ...state, buildingSentence: action.value }
        return newState
      case "guessSentence":
        newState = { ...state, guessSentence: action.value }
        return newState
      case "solvedSentences":
        newState = { ...state, solvedSentences: action.value }
        return newState
      case "checkReady":
        newState = { ...state, checkReady: action.value }
        return newState
      case "sentenceHasMistake":
        newState = { ...state, sentenceHasMistake: action.value }
        return newState
      case "mistakes":
        newState = { ...state, mistakes: action.value }
        return newState
      case "loadNextSentence":
        const sentences = action.value.newSentences
        const { nextSentence } = action.value
        const { newToGuess } = action.value
        const { currWordIndex } = action.value
        newState = {
          ...state,
          checkReady: false,
          readyToContinue: false,
          sentenceHasMistake: null,
          sentences,
          currentSentence: nextSentence,
          guessSentence: newToGuess,
          buildingSentence: [],
          mistakes: [],
          currWordIndex,
          isShowResults: false,
        }
        return newState
      case "readyToContinue":
        newState = { ...state, readyToContinue: action.value }
        return newState
      case "activateHint":
        const hint = action.value
        newState = {
          ...state,
          hints: {
            ...state.hints,
            ...hint,
          },
        }
        settingsStored.save("puzzle-hints", newState.hints)
        return newState
      case "levelUp":
        newState = { ...state, level: action.value }
        return newState
      case "startRound":
        newState = {
          ...state,
          isRoundFinished: false,
          readyToContinue: false,
          isShowResults: false,
          results: { ...state.results, notKnow: [] },
        }
        return newState
      case "finishRound":
        newState = {
          ...state,
          isRoundFinished: true,
          solvedSentences: [],
          checkReady: false,
          sentenceHasMistake: null,
        }
        return newState
      case "saveToResult":
        const res = action.value
        newState = {
          ...state,
          results: {
            ...state.results,
            ...res,
          },
        }
        return newState
      case "isShowResults":
        newState = { ...state, isShowResults: action.value }
        return newState
      case "roundImage":
        newState = { ...state, roundImage: action.value }
        return newState
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { storeGame, StateOfGameProvider }
