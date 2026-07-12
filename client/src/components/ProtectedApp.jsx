import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DepartmentPage from "../pages/DepartmentPage";

export default function ProtectedApp() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("Department");

  return (
    <div className="app-wrapper">
      <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="d-flex">
        <Sidebar
          collapsed={collapsed}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <main className={`main-content ${collapsed ? "expanded" : ""}`}>
          {activePage === "Department" ? (
            <DepartmentPage />
          ) : (
            <div className="placeholder-page">
              <h3>{activePage}</h3>
              <p className="text-muted">
                This module is not implemented in this demo.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}