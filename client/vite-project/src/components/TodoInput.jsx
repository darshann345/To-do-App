// pages/TodoInput.jsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BasicButtons from "../components/BasicButtons";
import TaskCard from "../components/TaskCard";
import BasicSelect from "../components/BasicSelect";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";
import Grid from "@mui/material/Grid";

export default function TodoInput() {
  const [task, setTask] = useState({
    _id: null,
    title: "",
    description: "",
    completed: false,
  });

  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState("All");

  // 🔹 Fetch todos whenever filter changes
  useEffect(() => {
    fetchTodos(filter);
  }, [filter]); // Add filter as dependency

  const fetchTodos = async (selectedFilter = "All") => {
    try {
      const res = await getTodos(selectedFilter); // Pass filter to backend
      const mapped = res.data.map((item) => ({
        ...item,
        title: item.title || item.todoName || "",
      }));
      setItems(mapped);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Add or Edit task
  const handleAddOrEditTask = async () => {
    if (!task.title?.trim()) return;

    try {
      if (isEditing && task._id) {
        await updateTodo(task._id, {
          title: task.title,
          description: task.description,
          completed: task.completed,
        });
        setIsEditing(false);
      } else {
        await createTodo({
          title: task.title,
          description: task.description,
        });
      }

      setTask({
        _id: null,
        title: "",
        description: "",
        completed: false,
      });

      fetchTodos(filter); // Fetch updated todos with current filter
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Delete task
  const handleDeleteTask = async (id) => {
    if (!id) return console.error("Cannot delete: ID is undefined");

    try {
      await deleteTodo(id);
      fetchTodos(filter); // Refresh todos after deletion
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Edit task
  const handleEditTask = (id) => {
    const taskToEdit = items.find((item) => item._id === id);
    if (!taskToEdit) return;

    setTask({
      _id: taskToEdit._id,
      title: taskToEdit.title || "",
      description: taskToEdit.description || "",
      completed: taskToEdit.completed || false,
    });

    setIsEditing(true);
  };

  // 🔹 Change completion status
  const handleChangeCategory = async (id, value) => {
    if (!id) return;

    try {
      await updateTodo(id, {
        completed: value === "Completed",
      });
      fetchTodos(filter); // Refresh todos with current filter
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: "20px", maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
      <br/>
      <br/>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Todo Name"
            name="title"
            value={task.title}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <BasicButtons
            text={isEditing ? "Edit Task" : "Add Task"}
            onClick={handleAddOrEditTask}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <BasicSelect
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // This will trigger useEffect
            options={["All", "Completed", "Uncompleted"]}
            fullWidth
          />
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 2 }}>
        <TaskCard
          items={items} // Already filtered by backend
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleChangeCategory={handleChangeCategory}
        />
      </Box>
    </Box>
  );
}