import PropTypes from "prop-types";

import Task from "../Task/Task";

import "./TaskList.css";

function TaskList({ tasks, onDeleted, onEdit, onToggleDone, handleInputChange, setPaused, setPlay }) {
  const keys = Object.keys(tasks);

  const elements = keys.map((key) => (
    <Task
      key={key}
      task={tasks[key]}
      onDeleted={() => onDeleted(key)}
      onEdit={() => onEdit(key)}
      onToggleDone={() => onToggleDone(key)}
      handleInputChange={handleInputChange}
      setPaused={() => setPaused(key)}
      setPlay={() => setPlay(key)}
    />
  ));

  return <ul className="todo-list">{elements} </ul>;
}

TaskList.propTypes = {
  tasks: PropTypes.shape({
    task: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      completed: PropTypes.bool,
      editing: PropTypes.bool,
      time: PropTypes.number,
      date: PropTypes.instanceOf(Date),
    }),
  }).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
};

export default TaskList;
