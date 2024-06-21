const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUser } = require("../../models/user");

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


//Sign in
async function httpUserSignIn(req, res) {
  try {
    const user = await findUser(req.body.login);
    if (!user) {
      return res.status(404).json(["Invalid user's credentials"]);
    }
    const isValidPass = await bcrypt.compare(
      req.body.pass,
      user.passwordHash
    );
    if (!isValidPass) {
      return res.status(404).json(["Invalid user's credentials"]);
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash: h, login, createdAt } = user;
    return res.status(200).json({ login, createdAt, token });
  } catch (e) {
    return res.status(404).json(["Invalid user's credentials"]);
  }
}




module.exports = {
  httpCreateUser,
  httpUserSignIn
};
