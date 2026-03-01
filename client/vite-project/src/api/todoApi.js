import axios from 'axios';

// Check if the app is running in production (Vercel) or locally
const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://to-do-app-56g7.onrender.com'  // Vercel URL
  : 'http://localhost:5000';  // Local URL

const API = axios.create({
  baseURL: `${baseURL}/api/todos`,
});

// Your API requests will use this base URL dynamically

export const getTodos = () => API.get("/");

export const createTodo = (data) => API.post("/", data);

export const updateTodo = (id, data) => API.put(`/${id}`, data);

export const deleteTodo = (id) => API.delete(`/${id}`);