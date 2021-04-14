/* eslint-disable consistent-return */
function compareForMistakes(arr1, arr2) {
  if (arr1.length !== arr2.length) return
  const res = []
  arr1.forEach((el, i) => {
    if (el !== arr2[i]) res.push("wrong")
    else res.push("right")
  })
  return res
}

export default compareForMistakes
