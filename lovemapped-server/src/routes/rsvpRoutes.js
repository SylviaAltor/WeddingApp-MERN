import express from "express";
import { getGuestByIndex, getAllGuests, updateGuest } from "../controllers/guestController";

const router = express.Router();

router.get("/data", getAllGuests);
router.get("/search", getGuestByIndex);
router.put("/update", updateGuest);

export default router;