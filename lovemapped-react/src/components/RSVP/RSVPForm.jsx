import React, { useState } from 'react';
import axios from 'axios';

const RSVPForm = () => {
  const [name, setName] = useState(''); // State for storing the name input
  const [attending, setAttending] = useState(false); // State for storing the attendance status

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Construct the data to be sent to the backend
    const rsvpData = {
      name: name,
      attending: attending,
    };

    // Send POST request to the backend
    axios.post('/api/rsvp', rsvpData)
      .then((response) => {
        console.log('RSVP received:', response.data); // Log the response from the server
      })
      .catch((error) => {
        console.error('Error submitting RSVP:', error); // Log any errors
      });
  };

  return (
    <div>
      <h2>RSVP Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state on input change
            required
          />
        </label>
        <br />
        <label>
          Attending:
          <input
            type="checkbox"
            checked={attending}
            onChange={(e) => setAttending(e.target.checked)} // Update attendance status on checkbox change
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RSVPForm;
