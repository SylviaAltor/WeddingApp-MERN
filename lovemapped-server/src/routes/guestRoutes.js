import express from "express";
import { loginGuest } from "../controllers/authGuestController.js";
import { createInvitation, getInvitationByCode, getAllInvitations, updateInvitation, deleteInvitation, getAllGuestDetails } from "../controllers/inviteCodeController.js";

const router = express.Router();

// Guest login route
router.post('/login', loginGuest);

// CRUD operations
router.post("/create", createInvitation);
router.get("/data", getAllInvitations);
router.get("/search", getInvitationByCode);
router.put("/update", updateInvitation);
router.delete("/delete", deleteInvitation);
router.get("/full", getAllGuestDetails);

export default router;
