import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RSVPForm from "../components/RSVP/RSVPForm.jsx";
import GuestNavbar from "../layouts/GuestNavbar.jsx";
import "../styles/RSVPPage.css";
import "animate.css";

export default function RSVPPage() {
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const guestName = localStorage.getItem("guestName");
    if (!guestName) {
      navigate("/");
      return;
    }

    async function fetchGuest() {
      try {
        const res = await fetch("/api/guest/rsvp/current", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch guest info");
        const data = await res.json();
        setGuest(data.guest);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchGuest();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!guest) return <div>Guest data not found.</div>;

  return (
    <div className="guest-welcome-container">
      <GuestNavbar />
      {/* RSVP Form */}
      <div className="pt-5 rsvp-card animate__animated animate__fadeInLeft">
        <div className="container-fluid form-padding">
          <RSVPForm guest={guest} />
        </div>
      </div>
    </div>
  );
}
