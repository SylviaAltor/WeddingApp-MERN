import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
// import MainLayout from '../layouts/MainLayout';
// import AdminLayout from '../layouts/AdminLayout';

// Pages
import LandingPage from '../pages/LandingPage';
import AdminDashboard from '../pages/AdminDashboard';
import RSVPPage from '../pages/RSVPPage';
import GuestWelcomePage from '../pages/GuestWelcomePage';
// import PhotoWallPage from '../pages/PhotoWallPage';
import NotFoundPage from '../pages/NotFoundPage';

// Auth
import PrivateRoute from '../components/auth/PrivateRoute';

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* public route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Admin Route */}
        <Route 
          path="/admin/dashboard" 
          element={<PrivateRoute><AdminDashboard /></PrivateRoute>} 
        />

        {/* Protected Guest Route */}
        <Route 
          path="/guest/welcome" 
          element={<PrivateRoute><GuestWelcomePage /></PrivateRoute>} 
        />

        {/* Protected RSVP Route */}
        <Route 
          path="/guest/rsvp" 
          element={<PrivateRoute><RSVPPage /></PrivateRoute>} 
        />

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default AppRouter;