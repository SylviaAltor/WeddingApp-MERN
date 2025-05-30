import React, { useEffect, useState } from "react";
import axios from "axios";

const GuestForm = ({showManageTable, selectedGuests, handleCheckboxChange, handleBack}) => {
  const [guestList, setGuestList] = useState([]);
  const [editingGuestIndex, setEditingGuestIndex] = useState(null);

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
    setEditingGuestIndex(guestIndex);
  };

  const handleCancelEdit = () => {
    setEditingGuestIndex(null);
  };

  const handleDeleteClick = (index) => {
    if (window.confirm("Are you sure you want to delete this guest?")) {
      setGuestList((prevList) => prevList.filter((guest) => guest.guestIndex !== index));
      if (editingGuestIndex === index) {
        setEditingGuestIndex(null);
      }
    }
  };

  if (!showManageTable) return null;

  return (
    <div className="slide-in manage-table-wrapper">
      <div className="table-responsive mt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Invitation Sent</th>
              <th>Sent time</th>
              <th>rsvpStatus</th>
              <th>plusOne</th>
              <th>appetizerChoice</th>
              <th>entréeChoice</th>
              <th>dietaryRestrictions</th>
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
              guestList.map((guest) => (
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
                  <td>{guest.invitationSent}</td>
                  <td>{guest.sentTime}</td>
                  <td>{guest.rsvpStatus}</td>
                  <td>{guest.plusOne}</td>
                  <td>{guest.appetizerChoice}</td>
                  <td>{guest.entréeChoice}</td>
                  <td>{guest.dietaryRestrictions}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
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
    </div>
  );
};

export default GuestForm;