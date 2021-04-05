/* eslint-disable */
async function getPages({ group }) {
  const url = `https://rs-lang-back.herokuapp.com/words?group=1`;
  const rawResponse = await fetch(url);
  if (rawResponse.status !== 200) return { error: 'Failed to get pages' };
  const content = await rawResponse.json();
  return content;
}

export default getPages;
// ${group}