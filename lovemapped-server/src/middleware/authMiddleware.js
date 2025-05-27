/**
 * Middleware to protect routes
 *
 * - Checks if a valid JWT token exists in the Authorization header.
 * - If valid, attaches admin ID to the request object (`req.adminId`).
 * - If missing or invalid, denies access.
 */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader?.startsWith("Bearer ")
      ? tokenHeader.split(" ")[1]
      : tokenHeader;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach full user info to request object
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Invalid token. Please provide a valid token." });
    } else {
      return res
        .status(500)
        .json({ message: "Internal authentication error." });
    }
  }
};
