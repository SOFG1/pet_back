const { getUsers, setLike, increaseAllUsersExp } = require("../../models/user");
const { formatUserData } = require("../../utils/formatUserData");

async function httpGetUsers(req, res) {
  try {
    const { users: list, count } = await getUsers(req.query.offset);
    const users = list.map((u) => formatUserData(u._doc));
    return res.json({ users, count });
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
}

async function httpSetLike(req, res) {
  if (req._id === req.body.id) {
    return res.status(400).json(["You can not like yourself"]);
  }
  try {
    const result = await setLike(req._id, req.body.id);
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json(["Internal server error"]);
  }
}

async function increaseUsersExperience() {
  setInterval(() => {
    increaseAllUsersExp();
  }, 1000 * 60 * 60);
}

module.exports = {
  httpGetUsers,
  httpSetLike,
  increaseUsersExperience,
};
