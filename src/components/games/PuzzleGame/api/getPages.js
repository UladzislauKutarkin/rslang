/* eslint-disable */
async function getPages({ group }) {
  const url = `https://rs-lang-back.herokuapp.com/words?group=${group}`;
  const rawResponse = await fetch(url)
  if (rawResponse.status !== 200) return { error: 'Failed to get pages' }
  const content = await rawResponse.json()
  console.log(content)
  const pages = {count: 30}
  return pages
}

export default getPages
