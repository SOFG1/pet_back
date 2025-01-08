const { body } = require("express-validator");

const addTodoValidator = [
  body("text", "Invalid todo text").isString().isLength({ min: 1 }),
];

module.exports = {
  addTodoValidator,
};
