const url = "https://raw.githubusercontent.com/dzinrai/rslang-data/master/"

function rawData({ filename, paint }) {
  if (!paint) return url + filename

  const url2 = `https://raw.githubusercontent.com/dzinrai/rslang_data_paintings/master/${filename}`
  return url2
}

export default rawData
