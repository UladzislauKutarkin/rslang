// const { token } = JSON.parse(localStorage.getItem("user"))
module.exports = { isAuthorized: !!JSON.parse(localStorage.getItem("user")) }
