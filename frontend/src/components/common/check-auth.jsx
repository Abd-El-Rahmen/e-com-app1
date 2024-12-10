import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    if (location.pathname.includes("/register")) {
      return (
        <>
          <Navigate to={"/auth/register"} />
          {children}
        </>
      );
    } else {
      return (
        <>
          <Navigate to={"/auth/login"} />
          {children}
        </>
      );
    }
  } else {
    if (user.role) {
      if (user.role === "admin" && (location.pathname.includes("/auth") || location.pathname.includes("/shop"))) {
        return (
          <>
            <Navigate to={"/admin/dashboard"} />
            {children}
          </>
        );
      } else if (user.role !== "admin" && (location.pathname.includes("/auth") || location.pathname.includes("/admin"))) {
        return (
          <>
            <Navigate to={"/shop/home"} />
            {children}
          </>
        );
      } else {
        return <>{children}</>;
      }
    }
  }
  
};

export default CheckAuth;
