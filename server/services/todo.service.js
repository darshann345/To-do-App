const mongoose = require("mongoose");
const Todo = require("../models/todo.model");

// Create
exports.createTodo = async (data) => {
  return await Todo.create(data);
};

// Get Todos with optional filtering
exports.getTodos = async (filter) => {
  let query = {}; // Default to all tasks

  if (filter === "Completed") {
    query.completed = true;
  } else if (filter === "Uncompleted") {
    query.completed = false;
  }

  // If no filter, return all tasks
  return await Todo.find(query);
};

// Update
exports.updateTodo = async (id, data) => {
  if (!id) throw new Error("ID is required");
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");

  const updated = await Todo.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Todo not found");
  return updated;
};

// Delete
exports.deleteTodo = async (id) => {
  if (!id) throw new Error("ID is required");
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");

  const deleted = await Todo.findByIdAndDelete(id);
  if (!deleted) throw new Error("Todo not found");
  return deleted;
};