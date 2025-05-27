import express from "express";
import { loginGuest } from "../controllers/authGuestController.js";
import { createInvitation, getInvitationByCode, getAllInvitations, updateInvitation, deleteInvitation } from "../controllers/inviteCodeController.js";

const router = express.Router();

// Guest login route
router.post('/login', loginGuest);

// CRUD operations
router.post("/create", createInvitation);
router.get("/data", getAllInvitations);
router.get("/search", getInvitationByCode);
router.put("/update", updateInvitation);
router.delete("/delete", deleteInvitation);

export default router;
