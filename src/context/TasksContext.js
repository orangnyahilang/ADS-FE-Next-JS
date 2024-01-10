// src/context/TasksContext.js

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [sortOrder, setSortOrder] = useState("asc");

  const createTask = (title, description, deadline, author, matkul) => {
    setTasks([...tasks, { id: uuid(), title, description, deadline, author, matkul }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks([...tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))]);
  };

  const deleteTask = (id) => {
    setTasks([...tasks.filter((task) => task.id !== id)]);
  };

  const sortTasks = (criteria) => {
    const sortedTasks = [...tasks];

    sortedTasks.sort((taskA, taskB) => {
      if (sortOrder === "asc") {
        return taskA[criteria].localeCompare(taskB[criteria]);
      } else {
        return taskB[criteria].localeCompare(taskA[criteria]);
      }
    });

    setTasks(sortedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        sortTasks,
        setSortOrder,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
