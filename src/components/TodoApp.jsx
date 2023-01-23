import React, { Component } from "react"

import NewTaskForm from "./NewTaskForm/NewTaskForm"
import TaskList from "./TaskList/TaskList"
import Footer from "./Footer/Footer"
import "./TodoApp.css"

export default class TodoApp extends Component {
  maxId = 100

  state = {
    todoData: [this.createTodoItem("First"), this.createTodoItem("Second"), this.createTodoItem("Third")],
    filter: "all",
    setClearComplitedTodo: () => {},
  }

  createTodoItem(label, min = 0, sec = 30) {
    return {
      label,
      min,
      sec,
      completed: false,
      id: this.maxId++,
      createDate: new Date(),
    }
  }

  addItem = (text, min, sec) => {
    if (text && (min || sec)) {
      const newTask = this.createTodoItem(text, Number(min), Number(sec))
      this.setState(({ todoData }) => {
        const newArray = [...todoData, newTask]
        return {
          todoData: newArray,
        }
      })
    }
  }

  addEditingItem = (text, id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((item) => {
          return item.id === id
            ? {
                ...item,
                label: text ? text : item.label,
                editing: !item.editing,
              }
            : item
        }),
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  filterFunc(items, filter) {
    switch (filter) {
      case "all":
        return items
      case "active":
        return items.filter((item) => !item.completed)
      case "completed":
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  onFilterChange = (filter) => this.setState({ filter })

  setClearComplitedTodo = () => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((item) => !item.completed) }
    })
  }

  itemProperty = (arr, id, PropName) => {
    return arr.map((item) => (item.id === id ? { ...item, [PropName]: !item[PropName] } : item))
  }

  onCheckedItem = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.itemProperty(todoData, id, "completed") }
    })
  }

  onEditingItem = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.itemProperty(todoData, id, "editing") }
    })
  }

  render() {
    const { todoData, filter, createDate, min, sec } = this.state

    const completedCount = todoData.filter((el) => el.completed).length
    const todoCount = todoData.length - completedCount
    const filterStatus = this.filterFunc(todoData, filter)

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={filterStatus}
            min={min}
            sec={sec}
            onDeleted={this.deleteItem}
            addEditingItem={this.addEditingItem}
            onToggleDone={this.onToggleDone}
            onCheckedItem={this.onCheckedItem}
            onEditingItem={(id) => {
              this.onEditingItem(id)
            }}
            dataCreated={createDate}
          />
          <Footer
            todoCount={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            setClearComplitedTodo={this.setClearComplitedTodo}
          />
        </section>
      </section>
    )
  }
}
