import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface PrivateRouteProps {
  redirect?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirect = "/login" }) => {
  const { authenticated, loading } = useUser();

  if (!authenticated && !loading) {
    return <Navigate to={redirect} />;
  }
  return <Outlet />;
};

export default PrivateRoute;
