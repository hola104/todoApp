import React, { Component } from "react";

import NewTaskForm from "./NewTaskForm/NewTaskForm";
import TaskList from "./TaskList/TaskList";
import Footer from "./Footer/Footer";
import "./TodoApp.css";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: {
        1: {
          id: 1,
          label: "First",
          createDate: new Date(),
          completed: false,
          editing: false,
          time: 180,
          pause: false,
        },
        2: {
          id: 2,
          label: "Second",
          createDate: new Date(),
          completed: false,
          editing: false,
          time: 200,
          pause: false,
        },
        3: {
          id: 3,
          label: "Third",
          createDate: new Date(),
          completed: false,
          editing: false,
          time: 170,
          pause: false,
        },
      },
      timerId: {
        1: "",
        2: "",
        3: "",
      },

      filter: "",
      setClearComplitedTodo: () => {},
    };
    this.maxId = 4;
  }

  addTask = (label, time) => {
    const newTask = {
      id: this.maxId++,
      label,
      time,
      editing: false,
      completed: false,
      createDate: new Date(),
    };

    const timerStart = (id) => this.handlerStartTimer(id);

    this.setState(({ todoData }, { timerId }) => ({
      todoData: { ...todoData, [newTask.id]: newTask },
      timerId: {
        ...timerId,
        [newTask.id]: timerStart(newTask.id),
      },
    }));
  };

  handleInputChange = (id) => (label) => {
    this.setState(({ todoData }) => ({
      todoData: { ...todoData, [id]: { ...todoData[id], label } },
    }));
  };

  handlerStartTimer = (id) => {
    this.timerId = setInterval(() => this.handleTimerChange(id), 1000);

    return this.timerId;
  };

  handleTimerChange = (id) => {
    const { timerId } = this.state;
    const { todoData } = this.state;

    const timeFinish = todoData[id].time === 0;
    if (timeFinish) {
      clearInterval(timerId[id]);
      this.setState({ timerId: { ...timerId, [id]: "" } });
      return;
    }

    this.setState({
      todoData: { ...todoData, [id]: { ...todoData[id], time: todoData[id].time - 1 } },
    });
  };

  setPaused = (id) => {
    const { timerId } = this.state;

    clearInterval(timerId[id]);
    this.setState({ timerId: { ...timerId, [id]: "" } });
  };

  setPlay = (id) => {
    const { timerId } = this.state;

    if (timerId[id]) return;

    const timerStart = this.handlerStartTimer(id);
    this.setState({ timerId: { ...timerId, [id]: timerStart } });
  };

  onEdit = (id) => {
    this.setState(({ todoData }) => ({
      todoData: {
        ...todoData,
        [id]: { ...todoData[id], editing: !todoData[id].editing },
      },
    }));
  };

  deleteItem = (id) => {
    const { todoData, timerId } = this.state;

    const newTasks = Object.keys(todoData).reduce((acc, key) => {
      if (key !== id) {
        acc[key] = todoData[key];
      }

      return acc;
    }, {});

    const newTimers = Object.keys(timerId).reduce((acc, key) => {
      if (key !== id) {
        acc[key] = timerId[key];
      }

      return acc;
    }, {});

    this.setState({ todoData: newTasks, timerId: newTimers });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: {
        ...todoData,
        [id]: { ...todoData[id], completed: !todoData[id].completed },
      },
    }));
  };

  filterAdaptation = (tasksItems, bool) =>
    Object.entries(tasksItems).reduce((acc, task) => {
      const [key, label] = task;
      const { completed } = label;

      if (completed === bool) {
        acc[key] = label;
      }

      return acc;
    }, {});

  filterFunc = (filter) => {
    const { todoData } = this.state;

    switch (filter) {
      case "active":
        return this.filterAdaptation(todoData, false);

      case "completed":
        return this.filterAdaptation(todoData, true);

      default:
        return todoData;
    }
  };

  countTasks = () => {
    const { todoData } = this.state;

    return Object.entries(todoData).reduce((acc, task) => {
      const [, label] = task;
      const { completed } = label;
      if (!completed) {
        return acc + 1;
      }

      return acc;
    }, 0);
  };

  onFilterChange = (filter) => this.setState({ filter });

  setClearComplitedTodo = () => {
    const { todoData } = this.state;
    const completedTasks = this.filterAdaptation(todoData, false);

    this.setState({ todoData: completedTasks });
  };

  render() {
    const { tasks, filter } = this.state;
    const active = this.countTasks(tasks);

    const countTasks = this.filterFunc(filter);

    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <TaskList
            tasks={countTasks}
            onDeleted={this.deleteItem}
            onEdit={this.onEdit}
            onToggleDone={this.onToggleDone}
            handleInputChange={this.handleInputChange}
            setPaused={this.setPaused}
            setPlay={this.setPlay}
          />
          <Footer
            active={active}
            filter={filter}
            onFilterChange={this.onFilterChange}
            setClearComplitedTodo={this.setClearComplitedTodo}
          />
        </section>
      </section>
    );
  }
}
