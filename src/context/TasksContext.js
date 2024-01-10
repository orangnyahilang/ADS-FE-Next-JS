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
  // save in localStorage
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const createTask = (title, description, deadline, author) =>
    setTasks([...tasks, { id: uuid(), title, description, deadline, author }]);

  const updateTask = (id, updatedTask) =>
    setTasks([
      ...tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    ]);

  const deleteTask = (id) =>
    setTasks([...tasks.filter((task) => task.id !== id)]);


  const searchTasks = (searchTerm) => {
    // Gunakan toLowerCase() agar pencarian tidak case-sensitive
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    setTasks([...tasks.filter((task) => task.title.toLowerCase().includes(lowerCaseSearchTerm))]);
  };
    
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        searchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};