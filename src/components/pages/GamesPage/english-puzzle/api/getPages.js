/* eslint-disable */
async function getPages({ group }) {
  const url = `https://rs-lang-back.herokuapp.com/words?group=${group}`;
  const rawResponse = await fetch(url)
  if (rawResponse.status !== 200) return { error: 'Failed to get pages' }
  const content = await rawResponse.json()
  console.log(content)
  // return content
  return { count: 30 }
}

export default getPages
