import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminRoute;
