const initialSettings = {
  difficulty: 1,
  page: 1,
  hints: {
    transHint: false,
    imageHint: false,
    audioHint: false,
    autoAudio: true,
  },
}

const settingsStored = {
  load() {
    const difficulty = localStorage.getItem("puzzle-difficulty")
    const page = localStorage.getItem("puzzle-page")
    const hints = localStorage.getItem("puzzle-hints")
    if (!difficulty || !page || !hints) {
      ;[...Object.keys(initialSettings)].forEach((setting) => {
        localStorage.setItem(
          `puzzle-${String(setting)}`,
          JSON.stringify(initialSettings[setting])
        )
      })
      return { ...initialSettings }
    }
    return {
      difficulty: JSON.parse(difficulty),
      page: JSON.parse(page),
      hints: JSON.parse(hints),
      isLocalStoreExist: true,
    }
  },
  save(setting, value) {
    localStorage.setItem(String(setting), JSON.stringify(value))
  },
}

export default settingsStored
