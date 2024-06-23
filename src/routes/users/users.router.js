const express = require("express");
const { checkAuth } = require("../../utils/checkAuth");
const { httpGetUsers } = require("./users.controller");




const usersRouter = express.Router();

usersRouter.get("/", checkAuth, httpGetUsers);


module.exports = usersRouter