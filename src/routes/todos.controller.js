const todos = require("../models/todos")


async function httpGetAllTodos(req, res) {
  const data = await todos.getAllTodos();
  return res.status(200).json(data);
}


module.exports = {
    httpGetAllTodos
}