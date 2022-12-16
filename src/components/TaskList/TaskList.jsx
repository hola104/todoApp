import React, { Component } from "react"
import PropTypes from "prop-types"

import Task from "../Task/Task"
import "./TaskList.css"

export default class TaskList extends Component {
  static defaultProps = {
    onDeleted: () => {},
    onEditingItem: () => {},
    onToggleDone: () => {},
    addEditingItem: () => {},
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.number,
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onEditingItem: PropTypes.func,
    onToggleDone: PropTypes.func,
    addEditingItem: PropTypes.func,
    createDate: PropTypes.instanceOf(Date),
  }

  render() {
    const { todos, onDeleted, onToggleDone, onCheckedItem, onEditingItem, addEditingItem, createDate } = this.props

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item

      return (
        <Task
          key={id}
          {...itemProps}
          onEditingItem={() => {
            onEditingItem(id)
          }}
          onDeleted={() => onDeleted(id)}
          addEditingItem={(text) => addEditingItem(text, id)}
          onToggleDone={() => onToggleDone(id)}
          onCheckedItem={() => onCheckedItem(id)}
          dataCreated={createDate}
        />
      )
    })

    return <ul className="todo-list">{elements}</ul>
  }
}
