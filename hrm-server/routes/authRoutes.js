const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

// Protected Route
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed Successfully 🎉",
    user: req.user,
  });
});

module.exports = router;