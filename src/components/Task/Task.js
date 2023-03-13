import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";

import Timer from "../Timer";

import "./Task.css";

function Task({ task, onDelete, onEdit, onToggleChecked, handleInputChange, setPaused, setPlay }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const textInputRef = useRef();

  const handleDateChange = () => {
    setCurrentDate(new Date());
  };

  const focusTextInput = () => {
    textInputRef.current.focus();
  };

  useEffect(() => {
    const interval = setInterval(() => handleDateChange(), 10000);

    return () => {
      clearInterval(interval);
    };
  }, [currentDate]);

  useEffect(() => {
    if (task.editing === true) {
      focusTextInput();
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (task.value.trim() !== "") {
      onEdit(task.value);
    }
  };

  const handleChange = (e) => {
    handleInputChange(task.id, e.target.value);
  };

  const timeCheck = () => formatDistance(task.date, currentDate, { includeSeconds: true });

  const onEscapeKey = (e) => {
    if (e.keyCode === 27) {
      onEdit(task.value);
    }
  };

  let className;

  if (task.checked) {
    className = "completed";
  } else if (task.editing) {
    className = "editing";
  } else {
    className = "";
  }

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleChecked} />
        <label>
          <span className="title">{task.value}</span>
          <Timer sec={task.sec} setPaused={setPaused} setPlay={setPlay} />
          <span className="description">{`created ${timeCheck()} ago`}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEdit} aria-label="Edit" />
        <button type="button" className="icon icon-destroy" onClick={onDelete} aria-label="Destroy" />
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="edit"
          value={task.value}
          onChange={handleChange}
          onKeyDown={onEscapeKey}
          ref={textInputRef}
        />
      </form>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    cheked: PropTypes.bool,
    editing: PropTypes.bool,
    sec: PropTypes.number,
    date: PropTypes.instanceOf(Date),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleChecked: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
};

export default Task;
