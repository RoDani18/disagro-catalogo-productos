import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

export const RutaProtegida = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};