const db = require("../config/db");

// ================= GET ALL USERS =================
const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, full_name, email, role, status FROM users ORDER BY id DESC"
    );

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= UPDATE USER ROLE =================
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Check if role is provided
    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required",
      });
    }

    // Update role
    await db.query(
      "UPDATE users SET role = ? WHERE id = ?",
      [role, id]
    );

    res.json({
      success: true,
      message: "User role updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
};