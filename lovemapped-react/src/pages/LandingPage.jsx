import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const LandingPage = () => {
  // State management
  const [showButtons, setShowButtons] = useState(true);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [guestCode, setGuestCode] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");

  // Hook for navigation
  const navigate = useNavigate();

  // Show or hide forms
  const handleGuestClick = () => {
    setShowButtons(false);
    setTimeout(() => setShowGuestForm(true), 300);
  };

  const handleAdminClick = () => {
    setShowButtons(false);
    setTimeout(() => setShowAdminForm(true), 300);
  };

  const handleBack = () => {
    setGuestCode("");
    setAdminCode("");
    setError("");
    setShowGuestForm(false);
    setShowAdminForm(false);
    setTimeout(() => setShowButtons(true), 300);
  };


  // Admin authentication handler
  const handleSubmitAdmin = async () => {
    if (!adminCode.trim()) {
      setError("Admin code required");
      return;
    }

    try {
      // Send login request to backend
      const response = await axios.post("/api/admin/login", { password: adminCode });

      // Store JWT token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to admin dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      setError("Invalid admin code"); // Display error message on failure
    }
  };

  // Guest authentication handler
  const handleSubmitGuest = async () => {
    if (!guestCode.trim()) {
      setError("Invitation code required");
      return;
    }

    try {

      const upperGuestCode = guestCode.trim().toUpperCase();

      // Send login request to backend
      const response = await axios.post("/api/guest/login", { inviteCode: upperGuestCode });

      // Store JWT token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to admin dashboard
      navigate("/guest/welcome");

    } catch (error) {
      setError("Invalid invitation code"); // Display error message on failure
    }
  };


  return (
    <div
      className="d-flex h-100 text-center"
      style={{ backgroundColor: "#f8f4e8", color: "#000", minHeight: "100vh" }}
    >
      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 992px) {
          .responsive-flex {
            flex-direction: column !important;
          }
          .carousel-section {
            max-width: 100% !important;
            margin-bottom: 2rem;
          }
          .form-section {
            width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>

      <div className="d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main className="px-3 container-lg my-5">
          {/* Welcome message section */}
          <h3>Welcome to Sylvia & Voke's Wedding!</h3>
          <p className="lead fs-6">
            Welcome to our wedding! Finally, we made it!
            <br />
            Get ready for love, laughter, maybe a few happy tears…
            <br />
            and a party with free beer you won't forget!
          </p>

          {/* Main content container */}
          <div
            className="d-flex justify-content-between responsive-flex"
            style={{ gap: "2rem", alignItems: "center" }}
          >
            {/* Carousel section */}
            <div className="carousel-section" style={{ flex: 1, maxWidth: "60%" }}>
              <div
                id="carouselExample"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="3000"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="/images/Slide1.png"
                      className="d-block w-100"
                      style={{ height: "500px", objectFit: "contain" }}
                      alt="Slide 1"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/images/Slide2.png"
                      className="d-block w-100"
                      style={{ height: "500px", objectFit: "contain" }}
                      alt="Slide 2"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/images/Slide3.jpg"
                      className="d-block w-100"
                      style={{ height: "500px", objectFit: "contain" }}
                      alt="Slide 3"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/images/Slide4.png"
                      className="d-block w-100"
                      style={{ height: "500px", objectFit: "contain" }}
                      alt="Slide 4"
                    />
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                </button>
              </div>
            </div>

            {/* Form/buttons section */}
            <div
              className="form-section"
              style={{
                flexBasis: "35%",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                justifyContent: "center",
                height: "500px",
              }}
            >
              {showButtons && (
                <>
                  <button
                    onClick={handleGuestClick}
                    className="btn btn-lg btn-dark fw-bold border-dark bg-dark shadow p-3 rounded"
                    style={{ width: "100%", height: "120px" }}
                  >
                    Guests this way please
                  </button>
                  <button
                    onClick={handleAdminClick}
                    className="btn btn-lg btn-light fw-bold border-white bg-white shadow p-3 rounded"
                    style={{ width: "100%", height: "120px" }}
                  >
                    This is our entrance
                  </button>
                </>
              )}

              {showGuestForm && (
                <div
                  className="p-4 rounded shadow-sm transition-all"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                >
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter invitation code"
                    value={guestCode}
                    onChange={(e) => {
                      setGuestCode(e.target.value);
                      setError("");
                    }}
                  />
                  {error && showGuestForm && (
                    <div className="text-danger mb-2">{error}</div>
                  )}
                  <div
                    className="d-flex flex-column gap-3"
                    style={{ marginTop: "1rem" }}
                  >
                    <button
                      className="btn btn-dark border-dark fw-bold bg-dark shadow p-3 rounded"
                      style={{ fontSize: "16px", width: "100%" }}
                      onClick={handleSubmitGuest} //for now
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-light fw-bold border-white bg-white shadow p-3 rounded"
                      style={{ fontSize: "16px", width: "100%" }}
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

              {showAdminForm && (
                <div
                  className="p-4 rounded shadow-sm transition-all"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                >
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Enter admin code"
                    value={adminCode}
                    onChange={(e) => {
                      setAdminCode(e.target.value);
                      setError("");
                    }}
                  />
                  {error && showAdminForm && (
                    <div className="text-danger mb-2">{error}</div>
                  )}
                  <div
                    className="d-flex flex-column gap-3"
                    style={{ marginTop: "1rem" }}
                  >
                    <button
                      className="btn btn-dark border-dark fw-bold bg-dark shadow p-3 rounded"
                      style={{ fontSize: "16px", width: "100%" }}
                      onClick={handleSubmitAdmin}
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-light fw-bold border-white bg-white shadow p-3 rounded"
                      style={{ fontSize: "16px", width: "100%" }}
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;