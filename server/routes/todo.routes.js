// routes/todo.routes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/todo.controllers");

router.post("/", controller.createTodo);
router.get("/", controller.getTodos);  // GET with filter handling
router.put("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

module.exports = router;