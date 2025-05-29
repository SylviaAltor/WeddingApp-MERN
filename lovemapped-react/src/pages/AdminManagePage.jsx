import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../layouts/AdminNavbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/AdminManagePage.css";

const AdminManagePage = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showManageTable, setShowManageTable] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  const handleAddGuestClick = () => {
    setIsSlidingOut(true);
    setTimeout(() => {
      setShowButtons(false);
      setShowAddForm(true);
      setIsSlidingOut(false); // reset for future use
    }, 400); // match animation duration
  };

  const handleManageClick = () => {
    setIsSlidingOut(true);
    setTimeout(() => {
      setShowButtons(false);
      setShowManageTable(true);
      setIsSlidingOut(false);
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guestName.trim() || !guestEmail.trim()) {
      setError("Guest name and email are required");
      return;
    }

    try {
      const response = await axios.post("/api/guest/create", {
        guestName: guestName,
        guestEmail: guestEmail,
      });

      if (response.status === 200 || response.status === 201) {
        setGuestName("");
        setGuestEmail("");
        setError("");
        setSuccess(true);
      } else {
        setError("Submission failed with status: " + response.status);
        setSuccess(false);
      }
    } catch (error) {
      setError("Submission failed. Please try again.");
    }
  };

  const handleBack = () => {
    setShowAddForm(false);
    setShowManageTable(false);
    setTimeout(() => setShowButtons(true), 300);
  };

  return (
    <div className="admin-welcome-container">
      <AdminNavbar />
      <div className="pt-5 guest-manage-area">
        {showButtons && (
          <div
            className={`d-flex flex-column align-items-center mt-4 button-column ${
              isSlidingOut ? "slide-out-right" : ""
            }`}
          >
            <button
              onClick={handleAddGuestClick}
              className="btn mx-3 guest-btn"
            >
              Add New Guest
            </button>
            <button onClick={handleManageClick} className="btn mx-3 admin-btn">
              Manage RSVPs
            </button>
          </div>
        )}

        {showAddForm && (
          <div className="slide-in">
            <h4 className="mt-4">Add New Guest</h4>
            {/* Placeholder form */}
            <form className="w-50 mx-auto">
              <input
                className="form-control mb-3"
                placeholder="Guest Name"
                value={guestName}
                onChange={(e) => {
                  setGuestName(e.target.value);
                  setError("");
                }}
              />
              <input
                className="form-control mb-3"
                placeholder="Email"
                value={guestEmail}
                onChange={(e) => {
                  setGuestEmail(e.target.value);
                  setError("");
                }}
              />
              {error && showAddForm && (
                <div className="text-danger mb-3">{error}</div>
              )}
              {!error && success && showAddForm && (
                <div className="text-success mb-3">
                  Guest added successfully!
                </div>
              )}
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-success submit-btn me-3"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="btn back-btn"
                  onClick={handleBack}
                  type="button"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        )}

        {showManageTable && (
          <div className="slide-in">
            <h4 className="mt-4">Manage RSVPs</h4>
            {/* Placeholder table */}
            <div className="table-responsive mt-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Guest Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{/* Future rows go here */}</tbody>
              </table>
            </div>
            <div className="text-center">
              <button className="btn back-btn" onClick={handleBack}>
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManagePage;
