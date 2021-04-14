import compareArrays from "./compareArrays"
import compareForMistakes from "./compareForMistakes"

function compareSentences(sentence1, sentence2, includePos) {
  const sent1 = [...sentence1]
  const sent2 = [...sentence2]
  if (!includePos) {
    sent1.forEach((word, i) => {
      sent1[i] = word.text
    })
    sent2.forEach((word, i) => {
      sent2[i] = word.text
    })
  } else if (includePos) {
    sent1.forEach((word, i) => {
      sent1[i] = word.text + word.id
    })
    sent2.forEach((word, i) => {
      sent2[i] = word.text + word.id
    })
  }
  return {
    isSentenceRight: compareArrays(sent1, sent2),
    mistakes: compareForMistakes(sent1, sent2),
  }
}

export default compareSentences
