const url = "https://rs-lang-back.herokuapp.com/"

function rawData({ filename, paint }) {
  if (paint) return url + filename

  const url2 = `https://rs-lang-back.herokuapp.com/${filename}`
  return url2
}

export default rawData
