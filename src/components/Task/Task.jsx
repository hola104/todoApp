import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";

import Timer from "../TodoTimer/TodoTimer";

import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();

    this.state = {
      currentDate: new Date(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.handleDateChange(), 5000);
  }

  componentDidUpdate() {
    if (this.props.task.editing) {
      this.textInput.current.focus();
    }

    // console.log(prevProps.task.editing, this.props.task.editing);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleDateChange() {
    this.setState({
      currentDate: new Date(),
    });
  }

  onSubmit = (e) => {
    const { task, onEdit } = this.props;

    e.preventDefault();

    if (task.label.trim() !== "") {
      onEdit(task.label);
    }
  };
  handleChange = (e) => {
    const { handleInputChange } = this.props;

    handleInputChange(e.target.value);
  };

  timeCreated = () => {
    const { task } = this.props;
    const { currentDate } = this.state;

    return formatDistance(task.createDate, currentDate, { includeSeconds: true });
  };

  render() {
    const { task, onDeleted, onEdit, onToggleDone, setPaused, setPlay, completed } = this.props;
    // let className = editing ? "editing" : completed ? "completed" : "";
    let className;
    if (task.editing) {
      className = "editing";
    } else if (task.completed) {
      className = "completed";
    } else {
      className = "";
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone} />
          <label>
            <span className="title">{task.label}</span>
            <Timer time={task.time} setPaused={setPaused} setPlay={setPlay} />
            <span className="description">{`created ${this.timeCreated()} ago`}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEdit} aria-label="Edit" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Destroy" />
        </div>

        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            ref={this.textInput}
            className="edit"
            autoFocus
            value={task.label}
            onChange={this.handleChange}
          />
        </form>
      </li>
    );
  }
}
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    time: PropTypes.number,
    date: PropTypes.instanceOf(Date),
  }).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,

  handleInputChange: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
};
export default Task;
