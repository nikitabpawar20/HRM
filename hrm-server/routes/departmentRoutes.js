const express = require("express");
const router = express.Router();
const {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deactivateDepartment,
} = require("../controllers/departmentController");

router.get("/", getAllDepartments);
router.post("/", createDepartment);
router.get("/:id", getDepartmentById);
router.put("/:id", updateDepartment);
router.patch("/:id/deactivate", deactivateDepartment);

module.exports = router;
