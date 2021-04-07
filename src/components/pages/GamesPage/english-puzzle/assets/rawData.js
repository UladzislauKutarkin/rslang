const url =
  "https://raw.githubusercontent.com/AlekseyGrimm/RS_Lang_rawData/master/"

function rawData({ filename, paint }) {
  if (!paint) return url + filename

  const url2 = `https://raw.githubusercontent.com/AlekseyGrimm/RS_Lang_rawData/master/${filename}`
  return url2
}

export default rawData
