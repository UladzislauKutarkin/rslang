/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react"
import { Header } from "semantic-ui-react"

function Field(props) {
  // eslint-disable-next-line react/prop-types
  const { isHighlighted } = props
  return (
    <div
      className={`difficulty-box ${isHighlighted ? "highlighted" : "regular"}`}
      onClick={() => props.onClick()}
    >
      <Header as="h4">{props.name}</Header>
      {props.desc}
    </div>
  )
}
export default Field
