const todos = require("../models/todos")


async function httpGetAllTodos(req, res) {
  const data = await todos.getAllTodos();
  return res.status(200).json(data);
}


async function httpAddTodo(req, res) {
  const data = await todos.addNewTodo(req.body.text)
  return res.status(201).json(data)
}


module.exports = {
    httpGetAllTodos,
    httpAddTodo
}