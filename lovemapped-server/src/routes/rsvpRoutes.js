import express from "express";
import { getGuestByIndex, getAllGuests, updateGuest } from "../controllers/guestController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import Invitation from "../models/invitationModel.js";
import Guest from "../models/guestModel.js";
import mongoose from "mongoose";

const router = express.Router();

// For current guest's information, only verified guest can access their own information
router.get("/current", verifyToken, async (req, res) => {
  try {
    const invitationId = req.user.id; // From InvitationModel

    if (!mongoose.Types.ObjectId.isValid(invitationId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Find the information from InvitationModel first
    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    // Use guestIndex from invitationMode to find guest rsvp from RSVPModel
    const guest = await Guest.findOne({ guestIndex: invitation.guestIndex });

    if (!guest) {
      return res.status(404).json({ message: "Guest RSVP not found" });
    }

    res.json({ guest });
  } catch (err) {
    console.error("Error in GET /current:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});


router.get("/data", getAllGuests);
router.get("/search", getGuestByIndex);
router.put("/update", updateGuest);

export default router;