const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    console.log(token,'this is my token')
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    
    console.log(decoded,'decoded is my token')

    const user = await User.findById(decoded.id).select("-password");
console.log(user,'this is my user')
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // 🔥 MAGIC
    next();
  } catch (error) {
    console.log(error,'this is my auth erro')
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
