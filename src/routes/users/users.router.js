const express = require("express");
const { checkAuth } = require("../../utils/checkAuth");
const {
  httpGetUsers,
  httpSetLike,
  increaseUsersExperience,
} = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get("/", checkAuth, httpGetUsers);
usersRouter.post("/like", checkAuth, httpSetLike);
increaseUsersExperience();

module.exports = usersRouter;
