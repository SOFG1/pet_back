const { getUsers } = require("../../models/user");
const { formatUserData } = require("../../utils/formatUserData");




async function httpGetUsers(req, res) {
  try {
    const {users: list, count} = await getUsers(req.query.offset)
    const users = list.map(u => formatUserData(u._doc))
    return res.json({users, count});
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
}

module.exports = {
  httpGetUsers,
};
