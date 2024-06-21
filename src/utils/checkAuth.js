const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json(["Authorization error"]);
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");
      req._id = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json(["Authorization error"]);
    }
  }
};

module.exports = {
    checkAuth
}