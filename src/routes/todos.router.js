const express = require("express");
const todosController = require("./todos.controller");

const todosRouter = express.Router();

todosRouter.get("/", todosController.httpGetAllTodos);

module.exports = todosRouter;
