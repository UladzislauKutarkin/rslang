import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import axios from "axios"
import App from "./App"
import configureStore from "./redux/store"

axios.defaults.baseURL = "https://rs-lang-back.herokuapp.com"
axios.defaults.headers.post["Content-Type"] = "application/json"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={configureStore()}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
