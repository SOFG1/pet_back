const express = require("express")
const todosRouter = require("./routes/todos/todos.router")
const userRouter = require("./routes/user/user.router")
const mailRouter = require("./routes/mail/mail.router")


const api = express.Router()


//Routes
api.use("/todos", todosRouter)
api.use("/user", userRouter)
api.use("/mail", mailRouter)



module.exports = api