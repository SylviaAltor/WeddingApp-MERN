import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../layouts/AdminNavbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-welcome-container">
      <AdminNavbar />
      <div className="pt-5 map-area">To be developed in Epic 4</div>
    </div>
  );
};

export default AdminDashboard;
