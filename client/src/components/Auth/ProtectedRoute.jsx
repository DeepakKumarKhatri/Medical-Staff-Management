import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../lib/cookieUtils";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ component: Component, forUser, ...rest }) => {
  const { user: reduxUser } = useSelector((state) => state.auth);
  let user = reduxUser;

  if (!user) {
    const token = getCookie("token");
    if (token) {
      try {
        user = jwtDecode(token);
      } catch (error) {
        return <Navigate to="/" />;
      }
    }
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user?.userRole !== forUser && user?.systemAccess?.userRole !== forUser) {
    return <Navigate to="/unauthorized" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
