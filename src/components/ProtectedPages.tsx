import { Outlet, Navigate } from "react-router-dom";
const authToken = localStorage.getItem("token");

export const ProtectedPages = () => {
  return authToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export const ProtectedAuthPages = () => {
  return authToken ? <Navigate to={"/dashboard"} /> : <Outlet />;
};