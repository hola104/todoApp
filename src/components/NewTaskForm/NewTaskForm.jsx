import React, { useState } from "react";
import PropTypes from "prop-types";

import "./NewTaskForm.css";

const NewTaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const onLabelChangeTitle = (e) => {
    if (e.target.value.charAt(0) === " ") {
      setTitle("");
    } else {
      setTitle(e.target.value);
    }
  };
  const onLabelChangeMin = (e) => {
    setMin(e.target.value);
  };
  const onLabelChangeSec = (e) => {
    setSec(e.target.value);
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   addTask(title, min, sec);
  //   setTitle("");
  //   setMin("");
  //   setSec("");
  // };

  const onClickEnter = (e) => {
    if (e.keyCode === 13) {
      if (title !== "" && min !== "" && sec !== "") {
        addTask(title, parseInt(min) * 60 + parseInt(sec));

        setTitle("");
        setMin("");
        setSec("");
      }
    }
  };

  return (
    <header className="header">
      <h1>todos hooks</h1>

      <form className="new-todo-form" onKeyDown={(e) => onClickEnter(e)}>
        <input
          placeholder="What needs to be done?"
          type="text"
          value={title}
          className="new-todo"
          onChange={onLabelChangeTitle}
          autoFocus
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={onLabelChangeMin}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={onLabelChangeSec}
        />
      </form>
    </header>
  );
};
NewTaskForm.defaultProps = {
  onLabelChangeTitle: () => {},
};
NewTaskForm.propTypes = {
  onLabelChangeTitle: PropTypes.func,
};
export default NewTaskForm;
