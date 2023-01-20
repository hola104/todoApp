import React, { Component } from "react"
import PropTypes from "prop-types"
import "./NewTaskForm.css"

export default class NewTaskForm extends Component {
  state = {
    label: "",
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

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.label !== "") {
      this.props.onItemAdded(this.state.label)
      this.setState({
        label: "",
      })
    }
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
            <input type="number" className="new-todo-form__timer" placeholder="Min" />
            <input type="number" className="new-todo-form__timer" placeholder="Sec" />
          </form>
        </header>
      </>
    )
  }
}
