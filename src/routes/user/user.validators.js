const { body, query } = require("express-validator");




const createUserValidator = [
    body("login", "Invalid login").isString().isLength({min: 3}),
    body("pass", "Invalid password").isString().isLength({min: 3}),
]


const deleteUserValidator = [
    query("pass", "Invalid password").isString().isLength({min: 3}),
]

module.exports = {
    createUserValidator,
    deleteUserValidator
}