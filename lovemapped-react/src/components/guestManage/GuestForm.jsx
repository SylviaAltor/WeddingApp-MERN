import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import GuestFormTable from "./GuestFormTable";
import GuestFormEditModal from "./GuestFormEditModal";
import useGuestFormData from "./useGuestFormData";
import axios from "axios";

const GuestForm = ({
  showManageTable,
  selectedGuests,
  handleCheckboxChange,
  handleBack,
}) => {
  const { guestList, updateGuest, deleteGuest } =
    useGuestFormData(showManageTable);
  const [editingGuestIndex, setEditingGuestIndex] = useState(null);
  const [editingGuestData, setEditingGuestData] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const handleEditClick = (index) => {
    setEditingGuestIndex(index);
    setEditingGuestData({ ...guestList[index] });
  };

  const handleCancelEdit = () => {
    setEditingGuestIndex(null);
    setEditingGuestData(null);
  };

  const handleSaveEdit = async () => {
    if (!editingGuestData) return;
    try {
      await updateGuest(editingGuestData);
      setEditingGuestIndex(null);
      setEditingGuestData(null);
    } catch {
      alert("Failed to update guest info. Please try again.");
    }
  };

  const handleDeleteInModal = async () => {
    if (!editingGuestData) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${editingGuestData.guestName}?`
      )
    ) {
      try {
        await deleteGuest(editingGuestData);
        setEditingGuestIndex(null);
        setEditingGuestData(null);
      } catch {
        alert("Failed to delete guest. Please try again.");
      }
    }
  };

  const handleInvite = async () => {
    try {
      const selectedInviteCodes = guestList
        .filter((guest) => selectedGuests.includes(guest.guestIndex))
        .map((guest) => guest.inviteCode);

      const response = await axios.post("/api/send-invitations", {
        inviteCodes: selectedInviteCodes,
      });

      console.log("Invitations sent:", response.data);
      setToastMessage("Invitations sent successfully!");
      setToastVariant("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error sending invites:", error);
      setToastMessage("Failed to send invitations.");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  const handlePrint = () => window.print();

  if (!showManageTable) return null;

  return (
    <div className="slide-in manage-table-wrapper">
      <GuestFormTable
        guestList={guestList}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        selectedGuests={selectedGuests}
        handleCheckboxChange={handleCheckboxChange}
        handleEditClick={handleEditClick}
      />
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-success back-btn" onClick={handleInvite}>
          Invite
        </button>
        <button className="btn btn-success submit-btn" onClick={handlePrint}>
          Print
        </button>
        <button className="btn back-btn" onClick={handleBack}>
          Back
        </button>
      </div>
      <GuestFormEditModal
        show={editingGuestIndex !== null}
        editingGuestData={editingGuestData}
        onChange={setEditingGuestData}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        onDelete={handleDeleteInModal}
      />
<ToastContainer
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
          minWidth: "300px",
        }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default GuestForm;
