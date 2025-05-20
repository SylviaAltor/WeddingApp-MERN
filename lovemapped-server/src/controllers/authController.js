import Couple from "../models/coupleModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

/**
 * Admin Login Controller
 * 
 * Authenticates the single admin record by validating the password.
 * - Retrieves the **only couple entry** from the database.
 * - Compares the entered password with the stored hashed password.
 * - Generates a JWT token upon successful authentication.
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing the password
 * @param {string} req.body.password - Admin password for authentication
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with authentication status and JWT token
 */
export const loginCouple = async (req, res) => {
  try {
    const { password } = req.body;

    // Retrieve the single couple entry (no need for email)
    const couple = await Couple.findOne(); // Since there's only one record, we don't need to filter by email

    if (!couple) {
      return res.status(401).json({ message: "No admin record found." });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, couple.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate JWT Token for session authentication
    const token = jwt.sign({ id: couple._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return success response with token
    res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};