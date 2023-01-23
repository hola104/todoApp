import React, { Component } from "react"
import PropTypes from "prop-types"
import "./NewTaskForm.css"

export default class NewTaskForm extends Component {
  state = {
    label: "",
    min: "",
    sec: "",
  }

  static defaultProps = {
    onLabelChange: () => {},
    onSubmit: () => {},
  }

  static propTypes = {
    onLabelChange: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  onLabelChange = (event) => {
    if (event.target.value.charAt(0) === " ") {
      this.setState({
        label: "",
      })
    } else {
      this.setState({
        label: event.target.value,
      })
    }
  }

  onMinChange = (event) => {
    this.setState({
      min: event.target.value,
    })
  }

  onSecChange = (event) => {
    this.setState({
      sec: event.target.value,
    })
  }

  onSubmit = (e) => {
    const { label, min, sec } = this.state
    e.preventDefault()

    if (label && (min || min === 0) && (sec || sec === 0)) {
      const { label, min, sec } = this.state
      this.props.onItemAdded(label, min, sec)
    } else {
      return
    }
    this.setState({
      label: "",
      min: "",
      sec: "",
    })
  }

  render() {
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <form className="new-todo-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.label}
              onChange={this.onLabelChange}
              autoFocus
            />
            <input
              type="number"
              className="new-todo-form__timer"
              onChange={this.onMinChange}
              placeholder="Min"
              value={this.state.min}
            />
            <input
              type="number"
              className="new-todo-form__timer"
              onChange={this.onSecChange}
              placeholder="Sec"
              value={this.state.sec}
            />
            <input type="submit" className="new-todo-form-button" hidden />
          </form>
        </header>
      </>
    )
  }
}
