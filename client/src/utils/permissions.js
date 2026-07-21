import { ROLES } from "./roles";

export const PERMISSIONS = {
  [ROLES.ADMIN]: [
    "dashboard",
    "employees",
    "departments",
    "attendance",
    "payroll",
    "reports",
    "settings",
    "users",
  ],

  [ROLES.HR]: [
    "dashboard",
    "employees",
    "departments",
    "attendance",
    "payroll",
    "reports",
    "users",
  ],

  [ROLES.MANAGER]: [
    "dashboard",
    "team",
    "attendance",
    "leave",
    "performance",
  ],

  [ROLES.TEAM_LEADER]: [
    "dashboard",
    "team",
    "attendance",
    "tasks",
  ],

  [ROLES.EMPLOYEE]: [
    "dashboard",
    "profile",
    "attendance",
    "leave",
    "salary",
  ],
};