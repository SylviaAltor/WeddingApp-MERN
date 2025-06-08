
/**
 *
 * Sets up the Express application, including middleware for handling JSON requests and enabling CORS.
 * 
 */

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import guestRoutes from "./routes/guestRoutes.js";
import rsvpRoutes from "./routes/rsvpRoutes.js";
import invitationRoute from "./routes/invitationEmail.js";

// Initialize Express application
const app = express();

// Middleware to allow cross-origin requests (frontend can communicate with backend)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Register authentication routes globally
app.use("/api/admin", authRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/guest/rsvp", rsvpRoutes);
app.use(invitationRoute);

// Export the configured Express app for use in other files
export default app;
