const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false, // production me true
    sameSite: "lax",
    maxAge: 0,
  });
  // ⚡ Return JSON always
  return res.status(200).json({ message: "Logged out" });
});

module.exports = router;
