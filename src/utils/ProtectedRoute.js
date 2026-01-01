import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, authRole }) => {
  const profile = JSON.parse(window.localStorage.getItem("profile"));

  return profile && authRole.includes(profile.role)
    ? children
    : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
