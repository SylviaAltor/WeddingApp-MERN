import React, { useState } from "react";
import axios from "axios";

const AddGuestForm = ({ onBack, onGuestAdded }) => {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
        if (onGuestAdded) onGuestAdded(); 
      } else {
        setError("Submission failed with status: " + response.status);
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setError("Submission failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="slide-in">
      <h4 className="mt-4">Add New Guest</h4>
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
        {error && <div className="text-danger mb-3">{error}</div>}
        {!error && success && (
          <div className="text-success mb-3">Guest added successfully!</div>
        )}
        <div className="d-flex justify-content-between">
          <button className="btn btn-success submit-btn me-3" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn back-btn" type="button" onClick={onBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGuestForm;
