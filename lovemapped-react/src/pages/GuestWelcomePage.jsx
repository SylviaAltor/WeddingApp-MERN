import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/GuestWelcomePage.css";

const GuestWelcomePage = () => {
  const guestName = localStorage.getItem("guestName") || "Guest";

  return (
    <div className="guest-welcome-container">
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

      {/* Main content container */}
      <div className="container-fluid d-flex flex-column align-items-center main-container pt-5">
        <div className="wedding-setting">
          <img
            src="/images/WeddingSetting.jpg"
            className="img-fluid"
            alt="Wedding Setting"
          />
        </div>
        <div>
          <div className="container text-center">
            <h1 className="display-6 mb-4">Sylvia & Voke's Wedding</h1>
            <section className="mb-5">
              <h2 className="h4 mb-2">Date</h2>
              <p>Saturday, July 11, 2026</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-2">Location</h2>
              <p>
                Sunset Bay Beach, South Bali
                <br />A secluded white-sand beach overlooking the Indian Ocean
              </p>
              <img
                src="/images/WhiteBeach.jpg"
                className="img-fluid"
                alt="White Beach"
              />
            </section>

            <section className="mb-5 text-start">
              <h2 className="h4 mb-2">Event Schedule</h2>
              <ul className="list-unstyled">
                <li>
                  <strong>Friday, July 10 – Welcome Dinner:</strong> 6:00 PM –
                  9:00 PM at a beachside restaurant nearby
                </li>
                <li className="mt-2">
                  <strong>Saturday, July 11 – Wedding Day:</strong>
                  <br />
                  Ceremony: 4:00 PM (on the beach)
                  <br />
                  Cocktail Hour: 5:00 PM (sunset lounge)
                  <br />
                  Reception & Dinner: 6:00 PM (under the stars)
                  <br />
                  Dancing: 8:00 PM until late
                </li>
              </ul>
            </section>

            <section className="mb-5 text-start">
              <h2 className="h4 mb-2">Travel & Accommodation</h2>
              <p>
                Nearest airport: Ngurah Rai International Airport (DPS)
                <br />
                Please arrive by July 9<br />
                Suggested hotels within 15 minutes of the beach:
              </p>
              <ul>
                <li>Coral Breeze Villas</li>
                <li>Ocean Harmony Resort</li>
                <li>Sunset Cliff Bungalows</li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-2">Dress Code</h2>
              <p>
                Beach Formal – breathable fabrics, summer colors, sandals or
                wedges encouraged
              </p>
            </section>

            <section className="mb-5 text-center">
              <a
                href="/guest/rsvp"
                className="btn px-5 fs-5 join-btn"
              >
                RSVP to Celebrate With Us!
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestWelcomePage;
