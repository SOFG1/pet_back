const express = require("express");
const todosController = require("./todos.controller");
const { addTodoValidator } = require("./todos.validators");
const {
  handleValidationErrors,
} = require("../../utils/handleValidationErrors");
const { checkAuth } = require("../../utils/checkAuth");

const todosRouter = express.Router();

todosRouter.get("/", checkAuth, todosController.httpGetAllTodos);
todosRouter.post(
  "/",
  checkAuth,
  addTodoValidator,
  handleValidationErrors,
  todosController.httpAddTodo
);
todosRouter.delete("/:id", checkAuth, todosController.httpDeleteTodo);
todosRouter.patch(
  "/:id",
  checkAuth,
  addTodoValidator,
  handleValidationErrors,
  todosController.httpEditTodo
);

module.exports = todosRouter;
