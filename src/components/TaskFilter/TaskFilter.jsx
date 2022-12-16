import React, { Component } from "react"
import PropTypes from "prop-types"
import "./TaskFilter.css"

export default class TaskFilter extends Component {
  static defaultProps = {
    filter: "all",
    onFilterChange: () => {},
    setClearComplitedTodo: () => {},
  }

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    setClearComplitedTodo: PropTypes.func,
  }

  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ]

  render() {
    const { filter, onFilterChange, setClearComplitedTodo } = this.props
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name
      const classIsActive = isActive ? "selected" : ""
      return (
        <button
          type="button"
          className={classIsActive}
          key={name}
          aria-label="filter"
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      )
    })

    return (
      <>
        <ul className="filters">
          <li>{buttons}</li>
        </ul>
        <button type="button" aria-label="clear complited" onClick={setClearComplitedTodo}>
          Clear completed
        </button>
      </>
    )
  }
}
