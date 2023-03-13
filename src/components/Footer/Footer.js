import PropTypes from "prop-types";

import TaskFilter from "../TaskFilter";

import "./Footer.css";

function Footer({ active, filterName, onFilterSelect, onFilterComplited }) {
  return (
    <footer className="footer">
      <span className="todo-count">{active} items left</span>
      <TaskFilter filterName={filterName} onFilterSelect={onFilterSelect} />
      <button
        type="button"
        className="clear-completed"
        onClick={() => onFilterComplited()}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  filterName: "all",
};

Footer.propTypes = {
  active: PropTypes.number.isRequired,
  filterName: PropTypes.string,
  onFilterSelect: PropTypes.func.isRequired,
  onFilterComplited: PropTypes.func.isRequired,
};

export default Footer;
