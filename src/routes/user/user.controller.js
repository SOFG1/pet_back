const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser } = require("../../models/user");

//Sign up
async function httpCreateUser(req, res) {
  try {
    const login = req.body.login;
    const pass = req.body.pass;

    const user = await createUser(login, pass);

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.send({ createdAt: user.createdAt, login: user.login, token });
  } catch (e) {
    console.log(e);
    return res.status(500).json(["Error occured"]);
  }
}

module.exports = {
  httpCreateUser,
};
