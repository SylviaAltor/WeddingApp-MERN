import React from 'react';
import RSVPForm from '../components/RSVP/RSVPForm';

const RSVPPage = () => {
  return (
    <div>
      <h1>Wedding RSVP</h1>
      <RSVPForm /> {/* Render the RSVP form component */}
    </div>
  );
};

export default RSVPPage;
