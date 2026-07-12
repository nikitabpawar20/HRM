import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.css";

import AuthPage from "./pages/AuthPage";
import DepartmentPage from "./pages/DepartmentPage";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";

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
        return <PlaceholderPage title="Employee" />;

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
      {/* Public Routes */}
      <Route path="/auth" element={<AuthPage />} />
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />

      <Route
        path="/departments"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />

      <Route
        path="/employee"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />

      <Route
        path="/leave"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />

      <Route
        path="/payroll"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* Unknown Routes */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}