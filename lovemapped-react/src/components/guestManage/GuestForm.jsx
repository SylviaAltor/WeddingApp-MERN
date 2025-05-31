import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const GuestForm = ({
  showManageTable,
  selectedGuests,
  handleCheckboxChange,
  handleBack,
}) => {
  const [guestList, setGuestList] = useState([]);
  const [editingGuestIndex, setEditingGuestIndex] = useState(null);
  const [editingGuestData, setEditingGuestData] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (showManageTable) {
      axios
        .get("/api/guest/full")
        .then((res) => {
          setGuestList(res.data.guests || []);
        })
        .catch((err) => {
          console.error("Error fetching guests:", err);
          setGuestList([]);
        });
    }
  }, [showManageTable]);

  const handleInvite = async () => {
    try {
      const selected = guestList.filter((guest) =>
        selectedGuests.includes(guest.guestIndex)
      );
      const response = await axios.post("/api/sendInvites", {
        guests: selected,
      });
      console.log("Invitations sent:", response.data);
    } catch (error) {
      console.error("Error sending invites:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEditClick = (index) => {
    setEditingGuestIndex(index);
    setEditingGuestData({ ...guestList[index] });
  };

  const handleCancelEdit = () => {
    setEditingGuestIndex(null);
  };

  const handleSaveEdit = async () => {
    if (!editingGuestData) return;

    try {
      const { inviteCode, _id, ...updates } = editingGuestData;

      const response = await axios.put(
        `http://localhost:5000/api/guest/update?inviteCode=${inviteCode}`,
        updates
      );

      setGuestList((prevList) =>
        prevList.map((guest) =>
          guest.guestIndex === editingGuestData.guestIndex
            ? { ...guest, ...editingGuestData }
            : guest
        )
      );

      setEditingGuestIndex(null);
      setEditingGuestData(null);

      console.log(response.data.message);
      console.log("Sending update request with:", editingGuestData);
    } catch (error) {
      console.error("Error updating guest:", error);
      alert("Failed to update guest info. Please try again.");
    }
  };

  const handleDeleteInModal = async () => {
    const guestToDelete = guestList[editingGuestIndex];

    if (
      window.confirm(
        `Are you sure you want to delete ${guestToDelete.guestName}?`
      )
    ) {
      try {
        await axios.delete(`/api/guest/delete`, {
          params: { inviteCode: guestToDelete.inviteCode },
        });

        setGuestList((prevList) =>
          prevList.filter(
            (guest) => guest.guestIndex !== guestToDelete.guestIndex
          )
        );

        setEditingGuestIndex(null);

        console.log("Guest deleted successfully.");
      } catch (error) {
        console.error("Error deleting guest:", error);
        alert("Failed to delete guest. Please try again.");
      }
    }
  };

  if (!showManageTable) return null;

  return (
    <div className="slide-in manage-table-wrapper">
      <div className="d-flex justify-content-end mb-2">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="form-select w-auto"
        >
          <option value="all">All</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Declined">Declined</option>
        </select>
      </div>
      <div className="table-responsive mt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>rsvpStatus</th>
              <th>plusOne</th>
              <th>appetizerChoice</th>
              <th>entréeChoice</th>
              <th>dietaryRestrictions</th>
              <th>Invitation Sent</th>
              <th>Sent time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {guestList.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No guests found.
                </td>
              </tr>
            ) : (
              guestList
                .filter((guest) =>
                  filterStatus === "all"
                    ? true
                    : guest.rsvpStatus === filterStatus
                )
                .map((guest) => (
                  <tr key={guest.inviteCode}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedGuests.includes(guest.guestIndex)}
                        onChange={() => handleCheckboxChange(guest.guestIndex)}
                      />
                    </td>
                    <td>{guest.guestName}</td>
                    <td>{guest.guestEmail}</td>
                    <td>{guest.rsvpStatus}</td>
                    <td>{guest.plusOne}</td>
                    <td>{guest.appetizerChoice}</td>
                    <td>{guest.entréeChoice}</td>
                    <td>{guest.dietaryRestrictions}</td>
                    <td>{guest.invitationSent}</td>
                    <td>{guest.sentTime}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() =>
                          handleEditClick(
                            guestList.findIndex(
                              (g) => g.guestIndex === guest.guestIndex
                            )
                          )
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
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

      {/* Modal for editing and deleting */}
      <Modal show={editingGuestIndex !== null} onHide={handleCancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Guest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingGuestIndex !== null && editingGuestData && (
            <Form>
              <Form.Group controlId="formGuestName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editingGuestData?.guestName || ""}
                  onChange={(e) =>
                    setEditingGuestData({
                      ...editingGuestData,
                      guestName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formGuestEmail" className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editingGuestData?.guestEmail || ""}
                  onChange={(e) =>
                    setEditingGuestData({
                      ...editingGuestData,
                      guestEmail: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteInModal}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GuestForm;
