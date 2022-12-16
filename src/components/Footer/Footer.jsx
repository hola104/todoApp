import React, { Component } from "react"
import PropTypes from "prop-types"

import TaskFilter from "../TaskFilter/TaskFilter"
import "./Footer.css"

export default class Footer extends Component {
  static defaultProps = {
    filter: "all",
    onFilterChange: () => {},
    setClearComplitedTodo: () => {},
  }

  static propTypes = {
    todoCount: PropTypes.number,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    setClearComplitedTodo: PropTypes.func,
  }

  render() {
    const { todoCount, filter, onFilterChange, setClearComplitedTodo } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TaskFilter
          filter={filter}
          onFilterChange={onFilterChange}
          setClearComplitedTodo={() => {
            setClearComplitedTodo()
          }}
        />
      </footer>
    )
  }
}
