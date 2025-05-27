import React, { useEffect, useState } from "react";
import RSVPForm from "../components/RSVP/RSVPForm.jsx";
import "../styles/RSVPPage.css";

export default function RSVPPage() {
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const guestName = localStorage.getItem("guestName") || "Guest";

  useEffect(() => {
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
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg shadow-sm guest-navbar">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-white" href="/">
            Welcome, {guestName}!
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {/* need to be updated */}
                <a
                  className="nav-link text-white fw-bold"
                  href="/guest/rsvp"
                >
                  My RSVP
                </a>
              </li>
              <li className="nav-item">
                {/* need to be updated */}
                <a
                  className="nav-link text-white fw-bold"
                  href="/guest/welcome"
                >
                  Photo Wall
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white fw-bold"
                  href="/guest/welcome"
                >
                  Home Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* RSVP Form */}
      <div className="container form-padding">
        <RSVPForm guest={guest} />
      </div>
    </div>
  );
}
