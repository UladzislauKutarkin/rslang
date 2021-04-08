/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
// import axios from "axios"
// import backEnd from "./heroku_back"

// singIN
const loginUser = async (user) => {
  const rawResponse = await fetch("https://rs-lang-back.herokuapp.com/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  const content = await rawResponse.json()

  console.log("loginUser", content)
}

// loginUser({ email: "test@test.com", password: "12345678" })

// get users words
const getUserWord = async ({ userId, wordId, token }) => {
  const rawResponse = await fetch(
    `https://rs-lang-back.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  )
  const content = await rawResponse.json()

  console.log(content)
}

// getUserWord({
//   userId: "5ec993df4ca9d600178740ae",
//   wordId: "5e9f5ee35eb9e72bc21af716",
// })

// login then get  users words
const signThenGetWords = async (user) => {
  const rawResponse = await fetch("https://rs-lang-back.herokuapp.com/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  const userData = await rawResponse.json()
  const wordsResponse = await fetch(
    `https://rs-lang-back.herokuapp.com/users/${userData.userId}/words/`,
    {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userData.token}`,
        Accept: "application/json",
      },
    }
  )

  const userWords = await wordsResponse.json()

  console.log("signThenGetWords", userWords)
}

// signThenGetWords({ email: "test@test.com", password: "12345678" })

// login then get  users words
const signThenGetAggregatedWords = async (user) => {
  const rawResponse = await fetch("https://rs-lang-back.herokuapp.com/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  const userData = await rawResponse.json()
  const wordsResponse = await fetch(
    `https://rs-lang-back.herokuapp.com/users/${userData.userId}/AggregatedWords/`,
    {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userData.token}`,
        Accept: "application/json",
      },
    }
  )

  const userWords = await wordsResponse.json()

  console.log("signThenGetAggregatedWords", userWords)
}

// signThenGetAggregatedWords({ email: "test@test.com", password: "12345678" })

// login then get spec users words
// userId, group, page, perPage, filter
const signThenGetSpecWords = async (
  user,
  group = 0,
  page = 0,
  perPage = 20,
  filter = "hard"
) => {
  const rawResponse = await fetch("https://rs-lang-back.herokuapp.com/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  const userData = await rawResponse.json()
  const wordsResponse = await fetch(
    `https://rs-lang-back.herokuapp.com/users/${userData.userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${perPage}&filter={"userWord.difficulty":"${filter}"}`,

    {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userData.token}`,
        Accept: "application/json",
      },
    }
  )

  const userWords = await wordsResponse.json()

  console.log("signThenGetSpecWords", userWords)
}

// signThenGetWords({ email: "test@test.com", password: "12345678" })

// create user word
const signThenCreateUsersWord = async (user, wordId, word) => {
  const rawResponse = await fetch("https://rs-lang-back.herokuapp.com/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  const userData = await rawResponse.json()
  const storeWord = await fetch(
    `https://rs-lang-back.herokuapp.com/users/${userData.userId}/words/${wordId}`,
    {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userData.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(word),
    }
  )
  const content = await storeWord.json()

  console.log("signThenCreateUsersWord", content)
}

// createUserWord({
//   userId: "5ec993df4ca9d600178740ae",
//   wordId: "5e9f5ee35eb9e72bc21af716",
//   word: {
//     difficulty: "weak",
//     optional: { testFieldString: "test", testFieldBoolean: true },
//   },
// })

export {
  loginUser,
  getUserWord,
  signThenGetWords,
  signThenGetAggregatedWords,
  signThenGetSpecWords,
  signThenCreateUsersWord,
}
