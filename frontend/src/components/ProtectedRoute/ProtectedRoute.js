import { Navigate } from "react-router-dom";
import * as React from "react";

const ProtectedRoute = ({ isLoggedIn, element }) => {
  return (
    isLoggedIn ? element : <Navigate to="sign-in" replace />
  );
}
export default ProtectedRoute;
