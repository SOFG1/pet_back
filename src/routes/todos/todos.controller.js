const todos = require("../../models/todos");

async function httpGetAllTodos(req, res) {
  try {
    const data = await todos.getAllTodos();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(["Error occured"]);
  }
}

async function httpAddTodo(req, res) {
  try {
    const data = await todos.addNewTodo(req.body.text);
    return res.status(201).json(data);
  } catch (e) {
    return res.status(500).json(["Coudn't add todo"]);
  }
}

async function httpDeleteTodo(req, res) {
  try {
    await todos.deleteTodo(req.params.id);
    return res.status(200).json()
  } catch (e) {
    return res.status(500).json(["Coudn't delete a todo with specified id"]);
  }
}

module.exports = {
  httpGetAllTodos,
  httpAddTodo,
  httpDeleteTodo,
};
