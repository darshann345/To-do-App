const todoService = require("../services/todo.service");

// Create
exports.createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Todos with filtering
exports.getTodos = async (req, res) => {
  try {
    const filter = req.query.filter; // e.g., ?filter=Completed or ?filter=Uncompleted
    const todos = await todoService.getTodos(filter); // Pass filter to service layer
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await todoService.updateTodo(id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await todoService.deleteTodo(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};