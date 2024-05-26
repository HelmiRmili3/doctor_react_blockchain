import React, { useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";
const RequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};
export default RequireAuth;
