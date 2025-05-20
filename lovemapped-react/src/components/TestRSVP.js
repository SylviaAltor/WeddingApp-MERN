import React from 'react';
import axios from 'axios';

const TestRSVP = () => {
  const sendRSVP = async () => {
    try {
      const response = await axios.post('/api/rsvp', {
        name: 'Alice',
        attending: true,
      });
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending RSVP:', error.message);
    }
  };

  return (
    <div>
      <h2>Test RSVP</h2>
      <button onClick={sendRSVP}>Send RSVP</button>
    </div>
  );
};

export default TestRSVP;
