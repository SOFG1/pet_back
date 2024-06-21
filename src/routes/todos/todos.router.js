const express = require("express");
const todosController = require("./todos.controller");
const { addTodoValidator } = require("./todos.validators");
const { handleValidationErrors } = require("../../utils/handleValidationErrors");

const todosRouter = express.Router();

todosRouter.get("/", todosController.httpGetAllTodos);
todosRouter.post("/", addTodoValidator, handleValidationErrors, todosController.httpAddTodo);
todosRouter.delete("/:id", todosController.httpDeleteTodo);


module.exports = todosRouter;
