import React from "react";
import { useNavigate } from "react-router-dom";

const GuestNavbar = () => {
  const guestName = localStorage.getItem("guestName") || "Guest";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("guestName");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm guest-navbar">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-white" href="/guest/welcome">
          Welcome, {guestName}!
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
              <a className="nav-link text-white fw-bold" href="/guest/rsvp">
                My RSVP
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/guest/welcome">
                Photo Wall
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/guest/welcome">
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

export default GuestNavbar;
