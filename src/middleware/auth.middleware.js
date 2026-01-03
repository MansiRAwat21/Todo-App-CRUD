const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const logger = require('../logger/logger')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }    
    const decoded = jwt.verify(token, process.env.JWT_KEY);        

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // 🔥 MAGIC
    next();
  } catch (error) {
    logger.error(error,'this is my auth erro')
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
