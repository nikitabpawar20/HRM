import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function RoleRoute({ allowedRoles, children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user's role is allowed
  if (!allowedRoles.includes(user.role)) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <h1>403 - Access Denied</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return children;
}