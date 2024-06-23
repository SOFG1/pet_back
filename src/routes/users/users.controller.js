const { getUsers } = require("../../models/user");
const { formatUserData } = require("../../utils/formatUserData");




async function httpGetUsers(req, res) {
  try {
    const users = await getUsers(req.query.offset)
    return res.json(users.map(u => formatUserData(u._doc)));
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
}

module.exports = {
  httpGetUsers,
};
