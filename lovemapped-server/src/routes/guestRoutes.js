import express from "express";
import { loginGuest } from "../controllers/authGuestController.js";
import { createInvitation, getInvitationByCode, getAllInvitations, updateInvitation, deleteInvitation } from "../controllers/inviteCodeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Guest login route
router.post('/login', loginGuest);


// Guest Dashboard, only for role: "guest"
router.get("/dashboard", verifyToken, (req, res) => {
  if (req.user.role !== "guest") {
    return res.status(403).json({ message: "Forbidden: invite-only access." });
  }
  res.json({ message: "Welcome to the guest dashboard!" });
});


// CRUD operations
router.post("/create", createInvitation);
router.get("/data", getAllInvitations);
router.get("/search", getInvitationByCode);
router.put("/update", updateInvitation);
router.delete("/delete", deleteInvitation);

export default router;
