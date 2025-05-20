/**
 *
 * Starts the backend server, connects to MongoDB, and listens for incoming requests.
 * 
 */

import connectDB from './config/dbConfig.js';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

