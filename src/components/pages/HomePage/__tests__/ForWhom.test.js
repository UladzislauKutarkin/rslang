import React from "react"
import { render, cleanup } from "@testing-library/react"
import ForWhom from "../ForWhom"
import "@testing-library/jest-dom/extend-expect"
import "regenerator-runtime/runtime"

afterEach(cleanup)

test("renders personalized greeting", async () => {
  const { getByText } = render(<ForWhom name="Satoshi" description="" />)
  await ForWhom(() => getByText(/Satoshi/i))
})
