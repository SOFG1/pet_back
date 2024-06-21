const { body } = require("express-validator");




const createUserValidator = [
    body("login", "Invalid login").isString().isLength({min: 3}),
    body("pass", "Invalid password").isString().isLength({min: 3}),
]


module.exports = {
    createUserValidator
}