import { useState, useRef, useEffect } from "react";

import NewTaskForm from "./NewTaskForm/NewTaskForm";
import TaskList from "./TaskList/TaskList";
import Footer from "./Footer/Footer";
import "./TodoApp.css";

function TodoApp() {
  const [todoData, setTodoData] = useState({
    100: {
      id: 100,
      label: "First",
      createDate: new Date(),
      completed: false,
      editing: false,
      time: 180,
      pause: false,
    },
    101: {
      id: 101,
      label: "Second",
      createDate: new Date(),
      completed: false,
      editing: false,
      time: 280,
      pause: false,
    },
    103: {
      id: 103,
      label: "Third",
      createDate: new Date(),
      completed: false,
      editing: false,
      time: 380,
      pause: false,
    },
  });

  const [filter, setFilter] = useState("");

  const timersIdRef = useRef({ 100: "" });
  const idRef = useRef(104);

  useEffect(() => {
    Object.values(todoData).forEach((task) => {
      if (task.time === 0 && !!timersIdRef.current[task.id]) {
        clearInterval(timersIdRef.current[task.id]);
        timersIdRef.current = { ...timersIdRef.current, [task.id]: "" };
      }
    });
  }, [todoData]);

  const addTask = (label, time) => {
    const newTask = {
      id: idRef.current,
      label,
      time,
      editing: false,
      completed: false,
      createDate: new Date(),
    };
    idRef.current += 1;

    setTodoData((todoData) => ({ ...todoData, [newTask.id]: newTask }));

    handlerStartTimer(newTask.id);
  };

  const handleInputChange = (id, label) => {
    setTodoData((todoData) => ({ ...todoData, [id]: { ...todoData[id], label } }));
  };
  const handleTimerChange = (id) => {
    setTodoData((todoData) => ({
      ...todoData,
      [id]: { ...todoData[id], time: todoData[id].time - 1 },
    }));
  };

  const handlerStartTimer = (id) => {
    const timerId = setInterval(() => handleTimerChange(id), 1000);
    timersIdRef.current = { ...timersIdRef.current, [id]: timerId };
  };
  const setPaused = (id) => {
    clearInterval(timersIdRef.current[id]);
    timersIdRef.current = { ...timersIdRef.current, [id]: "" };
  };

  const setPlay = (id) => {
    if (!todoData[id].time) return;
    if (timersIdRef.current[id]) return;

    handlerStartTimer(id);
  };

  const onEdit = (id) => {
    setTodoData((TodoData) => ({
      ...TodoData,
      [id]: { ...TodoData[id], editing: !TodoData[id].editing },
    }));
  };

  const deleteItem = (id) => {
    const newTasks = Object.keys(todoData).reduce((acc, key) => {
      if (key !== id) {
        acc[key] = todoData[key];
      }

      return acc;
    }, {});

    clearInterval(timersIdRef.current[id]);
    delete timersIdRef.current[id];

    setTodoData(newTasks);
  };

  const onToggleDone = (id) => {
    setTodoData((todoData) => ({
      ...todoData,
      [id]: { ...todoData[id], completed: !todoData[id].completed },
    }));
  };

  const filterAdaptation = (tasksItems, bool) =>
    Object.entries(tasksItems).reduce((acc, task) => {
      const [key, label] = task;
      const { completed } = label;

      if (completed === bool) {
        acc[key] = label;
      }

      return acc;
    }, {});

  const filterFunc = (filter) => {
    switch (filter) {
      case "active":
        return filterAdaptation(todoData, false);

      case "completed":
        return filterAdaptation(todoData, true);

      default:
        return todoData;
    }
  };

  const countTasks = () =>
    Object.entries(todoData).reduce((acc, task) => {
      const [, label] = task;
      const { completed } = label;
      if (!completed) {
        return acc + 1;
      }

      return acc;
    }, 0);

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const setClearComplitedTodo = () => {
    const activeTasks = filterAdaptation(todoData, false);
    const completedTasks = Object.values(todoData).filter((task) => task.completed);
    const completedTasksIds = completedTasks.map((task) => `${task.id}`);
    completedTasksIds.forEach((timerId) => {
      clearInterval(timersIdRef.current[timerId]);
      delete timersIdRef.current[timerId];
    });

    setTodoData(activeTasks);
  };

  const active = countTasks(todoData);
  const visibleTasks = filterFunc(filter);

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList
          tasks={visibleTasks}
          onDeleted={deleteItem}
          onEdit={onEdit}
          onToggleDone={onToggleDone}
          handleInputChange={handleInputChange}
          setPaused={setPaused}
          setPlay={setPlay}
        />
        <Footer
          active={active}
          filter={filter}
          onFilterChange={onFilterChange}
          setClearComplitedTodo={setClearComplitedTodo}
        />
      </section>
    </section>
  );
}
export default TodoApp;
