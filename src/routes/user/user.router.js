
const express = require("express");
const { handleValidationErrors } = require("../../utils/handleValidationErrors");
const userController = require("./user.controller")

const todosRouter = express.Router();



todosRouter.post("/", handleValidationErrors, userController.httpCreateUser);

module.exports = todosRouter