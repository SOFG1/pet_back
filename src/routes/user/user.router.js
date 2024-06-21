const express = require("express");
const {
  handleValidationErrors,
} = require("../../utils/handleValidationErrors");
const userController = require("./user.controller");
const { createUserValidator } = require("./user.validators");

const todosRouter = express.Router();

todosRouter.post(
  "/sign-up",
  createUserValidator,
  handleValidationErrors,
  userController.httpCreateUser
);

todosRouter.post(
  "/sign-in",
  createUserValidator,
  handleValidationErrors,
  userController.httpUserSignIn
);

module.exports = todosRouter;
