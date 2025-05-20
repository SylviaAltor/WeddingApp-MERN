import React from "react";
import { Navigate } from "react-router-dom";

/**
 * PrivateRoute Component
 * 
 * Protects admin routes by verifying JWT authentication.
 * If the user is not authenticated, redirects them to LandingPage.
 *
 * @param {Object} props - Child components representing the protected page
 * @returns {JSX.Element} Protected page or redirect
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if JWT token exists

  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;