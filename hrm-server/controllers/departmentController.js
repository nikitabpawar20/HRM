const db = require("../config/db");

// Helper: generate next dept_id like DEP-009
async function generateDeptId() {
  const [rows] = await db.query(
    "SELECT dept_id FROM departments ORDER BY id DESC LIMIT 1"
  );
  if (rows.length === 0) return "DEP-001";
  const last = parseInt(rows[0].dept_id.split("-")[1], 10);
  return `DEP-${String(last + 1).padStart(3, "0")}`;
}

// GET /api/departments
const getAllDepartments = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    let sql = "SELECT * FROM departments WHERE 1=1";
    const params = [];

    if (search) {
      sql += " AND (name LIKE ? OR dept_id LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    if (status && status !== "All") {
      sql += " AND status = ?";
      params.push(status);
    }
    sql += " ORDER BY created_at DESC";

    const [rows] = await db.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
};

// GET /api/departments/:id
const getDepartmentById = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM departments WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      const err = new Error("Department not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// POST /api/departments
const createDepartment = async (req, res, next) => {
  try {
    const { name, description, status = "Active" } = req.body;

    if (!name || name.trim().length < 3) {
      const err = new Error("Department name must be at least 3 characters.");
      err.statusCode = 400;
      return next(err);
    }

    // Check duplicate name
    const [existing] = await db.query(
      "SELECT id FROM departments WHERE name = ?",
      [name.trim()]
    );
    if (existing.length > 0) {
      const err = new Error("A department with this name already exists.");
      err.statusCode = 409;
      return next(err);
    }

    const dept_id = await generateDeptId();
    const [result] = await db.query(
      "INSERT INTO departments (dept_id, name, description, status) VALUES (?, ?, ?, ?)",
      [dept_id, name.trim(), description?.trim() || "", status]
    );

    const [newDept] = await db.query("SELECT * FROM departments WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json({ success: true, data: newDept[0] });
  } catch (err) {
    next(err);
  }
};

// PUT /api/departments/:id
const updateDepartment = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    const { id } = req.params;

    if (!name || name.trim().length < 3) {
      const err = new Error("Department name must be at least 3 characters.");
      err.statusCode = 400;
      return next(err);
    }

    // Check exists
    const [found] = await db.query("SELECT id FROM departments WHERE id = ?", [id]);
    if (found.length === 0) {
      const err = new Error("Department not found.");
      err.statusCode = 404;
      return next(err);
    }

    // Check duplicate name (exclude self)
    const [dup] = await db.query(
      "SELECT id FROM departments WHERE name = ? AND id != ?",
      [name.trim(), id]
    );
    if (dup.length > 0) {
      const err = new Error("Another department with this name already exists.");
      err.statusCode = 409;
      return next(err);
    }

    await db.query(
      "UPDATE departments SET name = ?, description = ?, status = ? WHERE id = ?",
      [name.trim(), description?.trim() || "", status, id]
    );

    const [updated] = await db.query("SELECT * FROM departments WHERE id = ?", [id]);
    res.json({ success: true, data: updated[0] });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/departments/:id/deactivate  (soft delete)
const deactivateDepartment = async (req, res, next) => {
  try {
    const [found] = await db.query("SELECT id FROM departments WHERE id = ?", [
      req.params.id,
    ]);
    if (found.length === 0) {
      const err = new Error("Department not found.");
      err.statusCode = 404;
      return next(err);
    }

    await db.query("UPDATE departments SET status = 'Inactive' WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ success: true, message: "Department deactivated successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deactivateDepartment,
};
