import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm admin-navbar">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-white" href="/admin/dashboard">
          Welcome, Sylvia&Voke!
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/admin/manage">
                Guest Management
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/admin/dashboard">
                Photo Wall
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/admin/welcome">
                Home Page
              </a>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white fw-bold btn btn-link"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
