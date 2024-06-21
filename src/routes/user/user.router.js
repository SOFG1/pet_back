const express = require("express");
const {
  handleValidationErrors,
} = require("../../utils/handleValidationErrors");
const userController = require("./user.controller");
const { createUserValidator } = require("./user.validators");

const todosRouter = express.Router();

todosRouter.post(
  "/",
  createUserValidator,
  handleValidationErrors,
  userController.httpCreateUser
);

module.exports = todosRouter;
