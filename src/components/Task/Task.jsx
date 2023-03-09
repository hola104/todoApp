import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";

import Timer from "../TodoTimer/TodoTimer";

import "./Task.css";

function Task({ task, onDeleted, onEdit, onToggleDone, handleInputChange, setPaused, setPlay }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const textInput = React.createRef();

  const handleDateChange = () => {
    setCurrentDate(new Date());
  };

  const focusEditInput = () => {
    textInput.current.focus();
  };

  useEffect(() => {
    if (task.editing) {
      focusEditInput();
    }
  });

  useEffect(() => {
    const interval = setInterval(() => handleDateChange(), 10000);

    return () => {
      clearInterval(interval);
    };
  }, [currentDate]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (task.label.trim() !== "") {
      onEdit(task.label);
    }
  };

  const handleChange = (e) => {
    handleInputChange(task.id, e.target.label);
  };

  const timeCreated = () => {
    formatDistance(task.createDate, currentDate, { includeSeconds: true });
  };

  let className;

  if (task.editing) {
    className = "editing";
  } else if (task.completed) {
    className = "completed";
  } else {
    className = "";
  }
  const escapeCancel = (e) => {
    if (e.keyCode === 27) {
      onEdit(task.label);
    }
  };

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleDone} />
        <label>
          <span className="title">{task.label}</span>
          <Timer time={task.time} setPaused={setPaused} setPlay={setPlay} />
          <span className="description">{`created ${timeCreated()} ago`}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEdit} aria-label="Edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Destroy" />
      </div>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={textInput}
          onKeyDown={escapeCancel}
          className="edit"
          autoFocus
          value={task.label}
          onChange={handleChange}
        />
      </form>
    </li>
  );
}
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    time: PropTypes.number,
    createDate: PropTypes.instanceOf(Date),
  }).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,

  handleInputChange: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
};
export default Task;
