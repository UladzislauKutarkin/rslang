import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "../App"
import configureStore from "../redux/store"

it("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDom.render(
    <BrowserRouter>
      <Provider store={configureStore()}>
        <App />
      </Provider>
    </BrowserRouter>,
    div
  )
})

describe("App", () => {
  test("loads without error", () => {
    const element = (
      <BrowserRouter>
        <Provider store={configureStore()}>
          <App />{" "}
        </Provider>
      </BrowserRouter>
    )

    expect(element).toBeTruthy()
  })
})
