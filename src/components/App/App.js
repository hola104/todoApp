import { useState, useRef, useEffect } from "react";

import NewTaskFrom from "../NewTaskFrom";
import TaskList from "../TaskList";
import Footer from "../Footer";
import OutsideClickHandler from "../OutsideClickHandler";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState({
    100: {
      id: 100,
      value: "First",
      checked: false,
      editing: false,
      sec: 120,
      date: new Date(),
    },
    101: {
      id: 101,
      value: "Second",
      checked: false,
      editing: false,
      sec: 220,
      date: new Date(),
    },
    102: {
      id: 102,
      value: "Third",
      checked: false,
      editing: false,
      sec: 320,
      date: new Date(),
    },
  });

  const [filterName, setFilterName] = useState("");
  const timersIdRef = useRef({ 100: "" });
  const idRef = useRef(104);

  useEffect(() => {
    Object.values(tasks).forEach((task) => {
      if (task.sec === 0 && !!timersIdRef.current[task.id]) {
        clearInterval(timersIdRef.current[task.id]);
        timersIdRef.current = { ...timersIdRef.current, [task.id]: "" };
      }
    });
  }, [tasks]);

  const handleTimerChange = (id) => {
    setTasks((tasks) => ({
      ...tasks,
      [id]: { ...tasks[id], sec: tasks[id].sec - 1 },
    }));
  };

  const handlerStartTimer = (id) => {
    const timerId = setInterval(() => handleTimerChange(id), 1000);
    timersIdRef.current = { ...timersIdRef.current, [id]: timerId };
  };

  const addTask = (value, sec) => {
    const newTask = {
      id: idRef.current,
      value,
      sec,
      checked: false,
      editing: false,
      date: new Date(),
    };

    idRef.current += 1;

    setTasks((tasks) => ({ ...tasks, [newTask.id]: newTask }));

    handlerStartTimer(newTask.id);
  };

  const handleInputChange = (id, value) => {
    setTasks((tasks) => ({ ...tasks, [id]: { ...tasks[id], value } }));
  };

  const setPaused = (id) => {
    clearInterval(timersIdRef.current[id]);
    timersIdRef.current = { ...timersIdRef.current, [id]: "" };
  };

  const setPlay = (id) => {
    if (!tasks[id].sec) return;
    if (timersIdRef.current[id]) return;

    handlerStartTimer(id);
  };

  const onEdit = (id) => {
    setTasks((tasks) => ({
      ...tasks,
      [id]: { ...tasks[id], editing: !tasks[id].editing },
    }));
  };

  const onDeleteItem = (id) => {
    const newTasks = Object.keys(tasks).reduce((acc, key) => {
      if (key !== id) {
        acc[key] = tasks[key];
      }

      return acc;
    }, {});

    clearInterval(timersIdRef.current[id]);
    delete timersIdRef.current[id];

    setTasks(newTasks);
  };

  const onToggleChecked = (id) => {
    setTasks((tasks) => ({
      ...tasks,
      [id]: { ...tasks[id], checked: !tasks[id].checked },
    }));
  };

  const filterObject = (tasksList, bool) =>
    Object.entries(tasksList).reduce((acc, task) => {
      const [key, value] = task;
      const { checked } = value;
      if (checked === bool) {
        acc[key] = value;
      }

      return acc;
    }, {});

  const filterTask = (filter) => {
    switch (filter) {
      case "active":
        return filterObject(tasks, false);

      case "complite":
        return filterObject(tasks, true);

      default:
        return tasks;
    }
  };

  const countTasks = () =>
    Object.entries(tasks).reduce((acc, task) => {
      const [, value] = task;
      const { checked } = value;
      if (!checked) {
        return acc + 1;
      }

      return acc;
    }, 0);

  const onFilterSelect = (filter) => {
    setFilterName(filter);
  };

  const onFilterComplited = () => {
    const activeTasks = filterObject(tasks, false);
    const checkedTasks = Object.values(tasks).filter((task) => task.checked);
    const checkedTasksIds = checkedTasks.map((task) => `${task.id}`);

    checkedTasksIds.forEach((timerId) => {
      clearInterval(timersIdRef.current[timerId]);
      delete timersIdRef.current[timerId];
    });

    setTasks(activeTasks);
  };

  const outsideClick = () => {
    const newEditedTasks = Object.entries(tasks).reduce((acc, task) => {
      const [key, value] = task;
      const { editing } = value;

      if (editing) {
        acc[key] = { ...value, editing: !editing };
      } else {
        acc[key] = value;
      }

      return acc;
    }, {});

    setTasks(newEditedTasks);
  };

  const onkeyEsc = () => {
    const newEditedTasks = Object.entries(tasks).reduce((acc, task) => {
      const [key, value] = task;
      const { editing } = value;

      if (editing) {
        acc[key] = { ...value, editing: !editing };
      } else {
        acc[key] = value;
      }

      return acc;
    }, {});

    setTasks(newEditedTasks);
  };

  const active = countTasks(tasks);
  const visibleTasks = filterTask(filterName);

  return (
    <section className="todoapp">
      <OutsideClickHandler outsideClick={() => outsideClick()} onkeyEsc={() => onkeyEsc()}>
        <NewTaskFrom addTask={addTask} />
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onDelete={onDeleteItem}
            onEdit={onEdit}
            onToggleChecked={onToggleChecked}
            handleInputChange={handleInputChange}
            setPaused={setPaused}
            setPlay={setPlay}
          />
          <Footer
            active={active}
            filterName={filterName}
            onFilterSelect={onFilterSelect}
            onFilterComplited={onFilterComplited}
          />
        </section>
      </OutsideClickHandler>
    </section>
  );
}

export default App;
