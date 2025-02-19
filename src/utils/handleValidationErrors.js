const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array().map((e) => e.msg));
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
