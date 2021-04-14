import settingsStored from "../localStorage/settings"

function saveRound(difficulty, page) {
  settingsStored.save("puzzle-difficulty", difficulty)
  settingsStored.save("puzzle-page", page)
}

export default saveRound
