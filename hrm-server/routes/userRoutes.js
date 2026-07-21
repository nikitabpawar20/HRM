const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUserRole,
} = require("../controllers/userController");

const {
  verifyToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Get all users (Admin only)
router.get(
  "/",
  verifyToken,
  authorizeRoles("Admin"),
  getAllUsers
);

// Update user role (Admin only)
router.put(
  "/:id/role",
  verifyToken,
  authorizeRoles("Admin"),
  updateUserRole
);

module.exports = router;