import PropTypes from "prop-types";

import TaskFilter from "../TaskFilter/TaskFilter";

import "./Footer.css";

function Footer({ active, filter, onFilterChange, setClearComplitedTodo }) {
  return (
    <footer className="footer">
      <span className="todo-count">{active} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={() => setClearComplitedTodo()}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  filter: "all",
};

Footer.propTypes = {
  active: PropTypes.number.isRequired,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  setClearComplitedTodo: PropTypes.func.isRequired,
};

export default Footer;
