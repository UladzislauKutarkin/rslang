import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import Counter from "../Counter"
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)

test("calling rerender", () => {
  const { rerender } = render(<Counter counter={1} />)
  expect(screen.getByTestId("counter")).toHaveTextContent("1")
  rerender(<Counter counter={2} />)
  expect(screen.getByTestId("counter")).toHaveTextContent("2")
})
