import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import "./NewTaskFrom.css";

function NewTaskFrom({ addTask }) {
  const [task, setTask] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const textInputRef = useRef();

  useEffect(() => {
    textInputRef.current.focus();
  }, [textInputRef]);

  const onValueChange = (e) => {
    const targetName = e.target.name;
    const regex = /^\d+$/;
    let inputValue;

    if (targetName === "task" && e.target.value.trim() !== "") {
      inputValue = e.target.value;
    } else if (regex.test(e.target.value, 10)) {
      inputValue = parseInt(e.target.value, 10);
    } else {
      inputValue = "";
    }

    switch (targetName) {
      case "task":
        return setTask(inputValue);

      case "min":
        return setMin(inputValue);

      default:
        return setSec(inputValue);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (task && (min || min === 0) && (sec || sec === 0)) {
      const seconds = Math.floor(min * 60 + sec);
      addTask(task, seconds);
    } else {
      return;
    }

    setTask("");
    setMin("");
    setSec("");
  };

  return (
    <header className="header">
      <h1>todo hooks</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          name="task"
          className="new-todo"
          placeholder="Task"
          value={task}
          onChange={onValueChange}
          ref={textInputRef}
          autoComplete="off"
        />
        <input
          name="min"
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={onValueChange}
          autoComplete="off"
        />
        <input
          name="sec"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={onValueChange}
          autoComplete="off"
        />
        <input type="submit" className="new-todo-form__submit" />
      </form>
    </header>
  );
}

NewTaskFrom.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskFrom;
