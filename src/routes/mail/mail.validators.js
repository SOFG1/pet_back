const { body } = require("express-validator");

const resetPassValidator = [
  body("service", "Invalid service").isString(),
  body("user", "Invalid user").isString(),
  body("pass", "Invalid pass").isString(),
  body("recipient", "Invalid recipient").isString(),
  body("subject", "Invalid subject").isString(),
  body("text", "Invalid text").isString(),
];

module.exports = {
  resetPassValidator,
};
