import React from "react";

const GuestFormTable = ({
  guestList,
  filterStatus,
  setFilterStatus,
  selectedGuests,
  handleCheckboxChange,
  handleEditClick,
}) => {
  return (
    <>
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
                    <td>
                      <span
                        className={`badge ${
                          guest.invitationSent ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {guest.invitationSent ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      {guest.sentTime
                        ? new Date(guest.sentTime).toLocaleDateString()
                        : ""}
                    </td>
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
    </>
  );
};

export default GuestFormTable;
