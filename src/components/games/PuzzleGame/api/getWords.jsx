async function getWords({ page, group }) {
  const url = `https://rs-lang-back.herokuapp.com/words?group=${group}&page=${page}`
  const rawResponse = await fetch(url)
  if (rawResponse.status !== 200) return { error: "Failed to get words" }
  const content = await rawResponse.json()
  return content
}

export default getWords
