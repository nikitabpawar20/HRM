import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  console.log({
    user,
    loading,
  });

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}