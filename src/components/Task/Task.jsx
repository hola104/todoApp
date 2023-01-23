import React, { Component } from "react"
import PropTypes from "prop-types"
import { formatDistanceToNow } from "date-fns"

import Timer from "../TodoTimer/TodoTimer"

import "./Task.css"

export default class Task extends Component {
  state = {
    label: "",
  }

  static defaultProps = {
    onDeleted: () => {},
    onEditingItem: () => {},
    onToggleDone: () => {},
    onSubmitTask: () => {},
    onLabelEditTask: () => {},
    createDate: () => {},
  }

  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onDeleted: PropTypes.func,
    onEditingItem: PropTypes.func,
    editing: PropTypes.bool,
    onToggleDone: PropTypes.func,
    createDate: PropTypes.instanceOf(Date),
  }

  onLabelEditTask = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmitTask = (e) => {
    e.preventDefault()
    this.props.addEditingItem(this.state.label)
    this.setState({
      label: "",
    })
  }

  render() {
    const { label, onDeleted, completed, onCheckedItem, onEditingItem, editing, createDate, min, sec, id } = this.props

    const createTime = formatDistanceToNow(createDate, {
      includeSeconds: true,
    })
    let classNames = editing ? "editing" : completed ? "completed" : ""

    const editInput = (
      <form onSubmit={this.onSubmitTask}>
        <input type="text" className="edit" onChange={this.onLabelEditTask} defaultValue={label} autoFocus />
      </form>
    )

    return (
      <>
        <li className={classNames}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={completed}
              onChange={() => {
                onCheckedItem()
              }}
            />
            <label>
              <span className="title">{label}</span>

              <span className="description">
                <Timer key={id} min={min} sec={sec} />
              </span>

              <span className="created">created {createTime} ago</span>
            </label>
            <button className="icon icon-edit" onClick={onEditingItem}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
          {editing && editInput}
        </li>
      </>
    )
  }
}
