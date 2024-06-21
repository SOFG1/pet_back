const express = require("express");
const {
  handleValidationErrors,
} = require("../../utils/handleValidationErrors");
const userController = require("./user.controller");
const { createUserValidator } = require("./user.validators");
const { checkAuth } = require("../../utils/checkAuth");

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

todosRouter.post(
  "/sign-in",
  createUserValidator,
  handleValidationErrors,
  userController.httpUserSignIn
);


todosRouter.get("/auth", checkAuth, userController.httpUsersAuth)

module.exports = todosRouter;
