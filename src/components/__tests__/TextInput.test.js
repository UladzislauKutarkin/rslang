import React from "react"
import { render, fireEvent, cleanup } from "@testing-library/react"
import TextInput from "../TextInput"
import "regenerator-runtime/runtime"

afterEach(cleanup)

it("Inputing text updates the state", () => {
  const mockCallback = jest.fn()
  const defaultProps = {
    onChange: mockCallback,
  }
  const { getByDisplayValue, getByTestId } = render(
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TextInput {...defaultProps} />
  )
  expect(getByDisplayValue("").textContent).toBe("")
  fireEvent.change(getByTestId("customButton"), {
    target: { value: "Text" },
  })
  expect(getByDisplayValue("").textContent).not.toBe("Text")
})

test("renders placeholder", async () => {
  const mockCallback = jest.fn()
  const defaultProps = {
    onChange: mockCallback,
  }
  const { getByPlaceholderText } = render(
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TextInput placeholder="password" {...defaultProps} />
  )
  await TextInput(() => getByPlaceholderText("password"))
})
