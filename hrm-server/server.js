const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("JWT_SECRET =", process.env.JWT_SECRET);

const departmentRoutes = require("./routes/departmentRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ── Middleware ──────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://hrm-frontend-blue.vercel.app",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────────────
app.get("/", (req, res) => res.json({ message: "Vibgyor Advicorp API is running 🚀" }));
app.use("/api/departments", departmentRoutes);
app.use("/api/auth", authRoutes);

// ── 404 Handler ──────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ── Error Handler ────────────────────────────────────
app.use(errorHandler);

// ── Start Server ─────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
