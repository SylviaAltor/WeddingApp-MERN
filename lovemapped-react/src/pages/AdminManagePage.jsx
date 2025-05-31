import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../layouts/AdminNavbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/AdminManagePage.css";
import AddGuestForm from "../components/guestManage/AddGuestForm.jsx";
import GuestForm from "../components/guestManage/GuestForm.jsx";

const AdminManagePage = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showManageTable, setShowManageTable] = useState(false);
  const [guestList, setGuestList] = useState([]);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleAddGuestClick = () => {
    setIsSlidingOut(true);
    setTimeout(() => {
      setShowButtons(false);
      setShowAddForm(true);
      setIsSlidingOut(false); 
    }, 400); 
  };

  const handleManageClick = () => {
    setIsSlidingOut(true);
    setTimeout(() => {
      setShowButtons(false);
      setShowManageTable(true);
      setIsSlidingOut(false);
    }, 400);
  };

  const handleBack = () => {
    setShowAddForm(false);
    setShowManageTable(false);
    setTimeout(() => setShowButtons(true), 300);
  };

  const handleCheckboxChange = (guestIndex) => {
    setSelectedGuests((prevSelected) =>
      prevSelected.includes(guestIndex)
        ? prevSelected.filter((id) => id !== guestIndex)
        : [...prevSelected, guestIndex]
    );
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
          <AddGuestForm
            onBack={handleBack}
            onGuestAdded={() => setSuccess(true)}
          />
        )}

        {showManageTable && (
          <GuestForm
            showManageTable={showManageTable}
            guestList={guestList}
            selectedGuests={selectedGuests}
            handleCheckboxChange={handleCheckboxChange}
            handleBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default AdminManagePage;
