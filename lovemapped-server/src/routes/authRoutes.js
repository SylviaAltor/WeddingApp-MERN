import express from "express";
import { loginCouple } from "../controllers/authController.js";
import { getCouple, createCoupleRecord, updateCoupleRecord, deleteCoupleRecord } from "../controllers/coupleController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin login route, create RESTful API endpoints
router.post("/login", loginCouple);

// Secure admin-only routes with role checking
router.get("/dashboard", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin-only access." });
  }
  res.json({ message: "Welcome to the admin dashboard!" });
});

// CRUD operations (Create and Delete are for development)
router.get("/data", getCouple);
router.post("/create", createCoupleRecord);
router.put("/update", updateCoupleRecord);
router.delete("/delete", deleteCoupleRecord);

export default router;