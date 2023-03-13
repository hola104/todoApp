import PropTypes from "prop-types";

import "./TaskFilter.css";

function TaskFilter({ filterName, onFilterSelect }) {
  let maxId = 1;

  const buttonsData = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "complite", label: "Completed" },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const active = filterName === name;
    const clazz = active ? "selected" : "";

    return (
      <li key={maxId++}>
        <button
          type="button"
          className={clazz}
          key={name}
          onClick={() => onFilterSelect(name)}
        >
          {label}
        </button>
      </li>
    );
  });

  TaskFilter.propTypes = {
    filterName: PropTypes.string,
    onFilterSelect: PropTypes.func.isRequired,
  };

  TaskFilter.defaultProps = {
    filterName: "all",
  };

  return <ul className="filters">{buttons}</ul>;
}

export default TaskFilter;
