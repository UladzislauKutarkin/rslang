function createOffsets(words) {
  const offsets = []
  const sentences = []
  words.forEach((word) => {
    let trimmedWord = word.textExample.replace("<b>", "")
    trimmedWord = trimmedWord.replace("</b>", "")
    const wordsInSentence = trimmedWord.split(" ")
    sentences.push(wordsInSentence)
  })

  sentences.forEach((sentence, i) => {
    offsets.push([])
    const len = sentence.join("").length
    sentence.forEach((word, j) => {
      offsets[i][j] = sentence.slice(0, j).join("").length / len
    })
  })
  return offsets
}

export default createOffsets
