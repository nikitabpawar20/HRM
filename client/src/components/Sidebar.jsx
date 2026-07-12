import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const allMenuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <FiGrid />,
    roles: ["HR", "Reception", "TeamLeader", "Employee"],
  },
  {
    label: "Department",
    path: "/departments",
    icon: <HiOutlineOfficeBuilding />,
    roles: ["HR"],
  },
  {
    label: "Employee",
    path: "/employee",
    icon: <FiUsers />,
    roles: ["HR", "Reception", "TeamLeader"],
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: <FiClock />,
    roles: ["HR", "Reception", "TeamLeader", "Employee"],
  },
  {
    label: "Leave",
    path: "/leave",
    icon: <FiCalendar />,
    roles: ["HR", "TeamLeader", "Employee"],
  },
  {
    label: "Payroll",
    path: "/payroll",
    icon: <FiDollarSign />,
    roles: ["HR"],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: <FiBarChart2 />,
    roles: ["HR"],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <FiSettings />,
    roles: ["HR"],
  },
];

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "Employee";

  const menuItems = allMenuItems.filter((item) =>
    item.roles.includes(role)
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={`sidebar-item ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="sidebar-icon">{item.icon}</span>

            {!collapsed && (
              <span className="sidebar-label">{item.label}</span>
            )}
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <li className="sidebar-item logout-item" onClick={handleLogout}>
          <span className="sidebar-icon">
            <FiLogOut />
          </span>

          {!collapsed && (
            <span className="sidebar-label">Logout</span>
          )}
        </li>
      </div>
    </aside>
  );
}