const express = require("express");
const { checkAuth } = require("../../utils/checkAuth");
const {
  handleValidationErrors,
} = require("../../utils/handleValidationErrors");
const { httpSendEmail } = require("./mail.controller");
const { resetPassValidator } = require("./mail.validators");

const mailRouter = express.Router();

mailRouter.post(
  "/",
  checkAuth,
  resetPassValidator,
  handleValidationErrors,
  httpSendEmail
);

module.exports = mailRouter;
