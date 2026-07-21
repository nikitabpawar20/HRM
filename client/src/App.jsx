import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.css";

import AuthPage from "./pages/AuthPage";
import DepartmentPage from "./pages/DepartmentPage";
import EmployeePage from "./pages/EmployeePage";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";

function PlaceholderPage({ title }) {
  return (
    <div className="placeholder-page">
      <h3>{title}</h3>
      <p className="text-muted">
        This module is not implemented in this demo.
      </p>
    </div>
  );
}

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const renderPage = () => {
    switch (location.pathname) {
      case "/dashboard":
        return <PlaceholderPage title="Dashboard" />;

      case "/departments":
        return <DepartmentPage />;

      case "/employee":
        return <EmployeePage />;

      case "/attendance":
        return <PlaceholderPage title="Attendance" />;

      case "/leave":
        return <PlaceholderPage title="Leave" />;

      case "/payroll":
        return <PlaceholderPage title="Payroll" />;

      case "/reports":
        return <PlaceholderPage title="Reports" />;

      case "/settings":
        return <PlaceholderPage title="Settings" />;

      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="d-flex">
        <Sidebar collapsed={collapsed} />

        <main className={`main-content ${collapsed ? "expanded" : ""}`}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Dashboard - All Logged In Users */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />

      {/* Department - Admin & HR Only */}
      <Route
        path="/departments"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["Admin", "HR"]}>
              <DashboardLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Employee */}
      <Route
        path="/employee"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["Admin", "HR", "Manager"]}>
              <DashboardLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Attendance */}
      <Route
        path="/attendance"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["Admin", "HR", "Manager", "TeamLeader", "Employee",]}>
              <DashboardLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Leave */}
      <Route
        path="/leave"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["Admin","HR","Manager","TeamLeader","Employee"]}>
              <DashboardLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Payroll */}
      <Route
        path="/payroll"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["Admin", "HR", "Employee"]}>
              <DashboardLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["Admin", "HR", "Manager"]}>
              <DashboardLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["Admin"]}>
              <DashboardLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* Invalid Routes */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}