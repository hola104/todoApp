import PropTypes from "prop-types";

import "./TaskFilter.css";

function TaskFilter({ filter, onFilterChange }) {
  let maxId = 1;

  const buttonsData = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const active = filter === name;
    const classFilter = active ? "selected" : "";

    return (
      <li key={maxId++}>
        <button type="button" className={classFilter} key={name} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  TaskFilter.propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired,
  };

  TaskFilter.defaultProps = {
    filter: "all",
  };

  return <ul className="filters">{buttons}</ul>;
}

export default TaskFilter;
