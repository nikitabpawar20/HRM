import React from "react";
import { FiMenu, FiBell, FiSearch } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";

export default function Navbar({ onToggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar navbar-light bg-white topbar shadow-sm px-3">
      <div className="d-flex align-items-center">
        <button className="btn btn-icon me-3" onClick={onToggleSidebar}>
          <FiMenu size={20} />
        </button>

        <span className="brand-logo">
          Vibgyor<span className="text-primary">Advicorp</span>
        </span>
      </div>

      <div className="d-none d-md-flex align-items-center topbar-search">
        <FiSearch className="search-icon" />

        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Search anything..."
        />
      </div>

      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-icon position-relative">
          <FiBell size={18} />
          <span className="notif-dot"></span>
        </button>

        <div className="d-flex align-items-center user-chip">
          <BsPersonCircle size={28} className="text-secondary" />

          <div className="ms-2 d-none d-md-block">
            <div className="user-name">
              {user?.full_name || "Guest"}
            </div>

            <div className="user-role">
              {user?.role || "User"}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}