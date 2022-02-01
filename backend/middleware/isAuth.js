const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log(payload)

    if (!payload) {
      res.status(403).json({ err: "FORBIDDEN" });
    } else {
      const currentUser = await User.findById(payload.userId).select("-password");
      req.user = currentUser;
      next();
    }
  } catch (error) {
    res.status(403).json({ err: "FORBIDDEN" });
  }
};
module.exports = isAuth