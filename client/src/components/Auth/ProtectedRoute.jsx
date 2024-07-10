import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, forUser, ...rest }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.systemAccess.userRole !== forUser) {
    return <Navigate to="/unauthorized" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
