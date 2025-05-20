import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
// import MainLayout from '../layouts/MainLayout';
// import AdminLayout from '../layouts/AdminLayout';

// Pages
import LandingPage from '../pages/LandingPage';
import AdminDashboard from '../pages/AdminDashboard';
// import GuestRSVPPage from '../pages/GuestRSVPPage';
import GuestWelcomePage from '../pages/GuestWelcomePage';
// import PhotoWallPage from '../pages/PhotoWallPage';
import NotFoundPage from '../pages/NotFoundPage';

// Auth
import PrivateRoute from '../components/auth/PrivateRoute';

function AppRouter() {
  return (
    <Router basename={window.location.pathname.split('/')[1] || ''}>
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

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default AppRouter;