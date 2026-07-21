import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { ROLES } from "../utils/roles";

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
    roles: [
      ROLES.ADMIN,
      ROLES.HR,
      ROLES.MANAGER,
      ROLES.TEAM_LEADER,
      ROLES.EMPLOYEE,
    ],
  },

  {
    label: "Department",
    path: "/departments",
    icon: <HiOutlineOfficeBuilding />,
    roles: [ROLES.ADMIN, ROLES.HR],
  },

  {
    label: "Employee",
    path: "/employee",
    icon: <FiUsers />,
    roles: [ROLES.ADMIN],
  },

  {
    label: "Attendance",
    path: "/attendance",
    icon: <FiClock />,
    roles: [
      ROLES.ADMIN,
      ROLES.HR,
      ROLES.MANAGER,
      ROLES.TEAM_LEADER,
      ROLES.EMPLOYEE,
    ],
  },

  {
    label: "Leave",
    path: "/leave",
    icon: <FiCalendar />,
    roles: [
      ROLES.ADMIN,
      ROLES.HR,
      ROLES.MANAGER,
      ROLES.TEAM_LEADER,
      ROLES.EMPLOYEE,
    ],
  },

  {
    label: "Payroll",
    path: "/payroll",
    icon: <FiDollarSign />,
    roles: [ROLES.ADMIN, ROLES.HR, ROLES.MANAGER, ROLES.EMPLOYEE],
  },

  {
    label: "Reports",
    path: "/reports",
    icon: <FiBarChart2 />,
    roles: [ROLES.ADMIN, ROLES.HR, ROLES.MANAGER],
  },

  {
    label: "Settings",
    path: "/settings",
    icon: <FiSettings />,
    roles: [ROLES.ADMIN],
  },
];

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);

  const role = user?.role || ROLES.EMPLOYEE;

  const menuItems = allMenuItems.filter((item) =>
    item.roles.includes(role)
  );

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
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