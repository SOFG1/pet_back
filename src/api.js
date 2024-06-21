const express = require("express")
const todosRouter = require("./routes/todos.router")


const api = express.Router()


//Routes
api.use("/todos", todosRouter)

module.exports = api