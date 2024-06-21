const todos = require("../../models/todos");

async function httpGetAllTodos(req, res) {
  try {
    const data = await todos.getAllTodos();
    const formated = data.map(({id, text}) => ({id, text}))
    return res.status(200).json(formated);
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

async function httpEditTodo(req, res) {
  try {
    const data = await todos.editTodo(req.params.id, req.body.text);
    return res.status(200).json(data)
  } catch (e) {
    return res.status(500).json(["Coudn't delete a todo with specified id"]);
  }
}

module.exports = {
  httpGetAllTodos,
  httpAddTodo,
  httpDeleteTodo,
  httpEditTodo
};
