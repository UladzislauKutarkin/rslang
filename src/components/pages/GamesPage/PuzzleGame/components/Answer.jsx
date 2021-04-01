/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unused-prop-types */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { Container, Form } from "semantic-ui-react"

class Answer extends Component {
  constructor() {
    super()
    this.state = {
      value: "",
    }
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({ value: event.target.value.toUpperCase() })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.onSubmit(this.state.value)
    this.setState({
      value: "",
    })
  }

  render() {
    if (this.gameType === "home") {
      return null
    }
    return (
      <Container className="answer-container">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Input
            placeholder="Answer..."
            name="answer"
            value={this.state.value}
            onChange={(e) => this.handleChange(e)}
          />
          <Form.Button content="Submit" />
        </Form>
      </Container>
    )
  }
}

export default Answer

Answer.propTypes = {
  state: PropTypes.string,
  value: PropTypes.string,
}

Answer.defaultProps = {
  value: "",
  state: "",
}