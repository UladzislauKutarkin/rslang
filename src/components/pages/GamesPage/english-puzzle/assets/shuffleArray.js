function shuffleArray(arr) {
  const newArr = [...arr]
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = newArr[i]
    newArr[i] = newArr[j]
    newArr[j] = temp
  }
  return newArr
}

export default shuffleArray
