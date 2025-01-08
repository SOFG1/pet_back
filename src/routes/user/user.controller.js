const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUser,
  findUserById,
  deleteUser,
  changeUserPass,
  changeUserPhoto,
} = require("../../models/user");

const { formatUserData } = require("../../utils/formatUserData");

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
    res.send(formatUserData({ ...user, token }));
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
      return res.status(401).json(["Invalid user's credentials"]);
    }
    const isValidPass = await bcrypt.compare(req.body.pass, user.passwordHash);
    if (!isValidPass) {
      return res.status(401).json(["Invalid user's credentials"]);
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
    return res.status(200).json(formatUserData({ ...user, token }));
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
}

//Check Authorization
async function httpUsersAuth(req, res) {
  try {
    const user = await findUserById(req._id);
    if (user) {
      const token = req.headers.authorization;
      return res.json(formatUserData({ ...user, token }));
    }
    return res.status(404).json(["User not found"]);
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
}

//Permanently delete profile
async function httpDeleteProfile(req, res) {
  try {
    const user = await findUserById(req._id);
    if (!user) {
      return res.status(401).json(["Invalid password"]);
    }
    const isValidPass = await bcrypt.compare(req.query.pass, user.passwordHash);
    if (!isValidPass) {
      return res.status(401).json(["Invalid password"]);
    }
    await deleteUser(req._id);
    return res.status(200).json();
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
}

//Reset password
async function httpUserResetPassword(req, res) {
  try {
    const user = await findUserById(req._id);
    if (!user) {
      return res.status(401).json(["User not found"]);
    }
    const isValidPass = await bcrypt.compare(
      req.body.oldPass,
      user.passwordHash
    );
    if (!isValidPass) {
      return res.status(401).json(["Invalid password"]);
    }
    const updatedUser = await changeUserPass(req._id, req.body.newPass);
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    return res.status(200).json(formatUserData({ ...updatedUser, token }));
  } catch (e) {
    return res.status(401).json(["Invalid user's credentials"]);
  }
}

async function httpUploadUserImage(req, res) {
  try {
    const updatedUser = await changeUserPhoto(req._id, req.fileName);
    const token = req.headers.authorization;
    res.json(formatUserData({ ...updatedUser, token }));
  } catch (e) {
    return res.status(500).json(["Error occured"]);
  }
}

module.exports = {
  httpCreateUser,
  httpUserSignIn,
  httpUsersAuth,
  httpDeleteProfile,
  httpUserResetPassword,
  httpUploadUserImage,
};
