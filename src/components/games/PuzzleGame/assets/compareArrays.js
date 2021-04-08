function compareArrays(arr1, arr2) {
  if (arr1.length === arr2.length) {
    for (let index = 0; index < arr1.length; index += 1) {
      if (arr2[index] !== arr1[index]) return false
    }
    return true
  }
  return false
}

export default compareArrays
