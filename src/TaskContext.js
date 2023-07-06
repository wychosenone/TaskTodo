import { createContext, useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export const TaskContext = createContext();

export default function TaskProvider({ children }) {
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [
    { id: 1, name: "Learn React", isCompleted: false },
    { id: 2, name: "Master React", isCompleted: false },
    { id: 3, name: "Explore the Depth", isCompleted: false },
    { id: 4, name: "Yue is gonna Win", isCompleted: false },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [task, setTask] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Incomplete");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value)

  }

  const addTask = (e) => {
    e.preventDefault();

    const trimmedTaskName = task.trim();
    if (trimmedTaskName === "") {
      setSeverity("warning");
      setMessage("Task name cannot be empty!");
      setOpen(true);
      return;
    }

    const doesTaskExist = tasks.some(
      (existingTask) => existingTask.name === trimmedTaskName
    );
    if (doesTaskExist) {
      setSeverity("warning");
      setMessage("A task with the same name already exists!");
      setTask("");
      setOpen(true);
      return;
    }

    const newTask = {
      id: Date.now(),
      name: trimmedTaskName,
      isCompleted: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
    setSeverity("info");
    setMessage("Task added successfully!");
    setOpen(true);
  };

  const completeTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: true } : task
      )
    );
    setSeverity("success");
    setMessage("Task completed successfully!");
    setOpen(true);
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setSeverity("error");
    setMessage("Task deleted successfully!");
    setOpen(true);
  };

  const setToIncomplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: false } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        addTask,
        tasks,
        completeTask,
        removeTask,
        task,
        setTask,
        setToIncomplete,
        handleFilterChange,
        selectedFilter
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={severity}
          onClose={handleClose}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </TaskContext.Provider>
  );
}
