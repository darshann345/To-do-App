import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/todos",
});

// Get all todos with an optional filter
export const getTodos = (filter = "All") => API.get("/", { params: { filter } });

// Create todo
export const createTodo = (data) => API.post("/", data);

// Update todo
export const updateTodo = (id, data) => API.put(`/${id}`, data);

// Delete todo
export const deleteTodo = (id) => API.delete(`/${id}`);