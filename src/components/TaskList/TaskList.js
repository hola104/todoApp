import PropTypes from "prop-types";

import Task from "../Task";

import "./TaskList.css";

function TaskList({
  tasks,
  onDelete,
  onEdit,
  onToggleChecked,
  handleInputChange,
  setPaused,
  setPlay,
}) {
  const keys = Object.keys(tasks);

  const elements = keys.map((key) => (
    <Task
      key={key}
      task={tasks[key]}
      onDelete={() => onDelete(key)}
      onEdit={() => onEdit(key)}
      onToggleChecked={() => onToggleChecked(key)}
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
      value: PropTypes.string,
      cheked: PropTypes.bool,
      editing: PropTypes.bool,
      sec: PropTypes.number,
      date: PropTypes.instanceOf(Date),
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleChecked: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
};

export default TaskList;
