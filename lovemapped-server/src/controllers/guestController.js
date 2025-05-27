import {
  getGuestByIndexService,
  getAllGuestsService,
  updateGuestService,
} from "../services/guestService.js";

/**
 * Get guest information by guestIndex
 */
export const getGuestByIndex = async (req, res) => {
  try {
    const { guestIndex } = req.query;

    if (!guestIndex) {
      return res.status(400).json({ message: "guestIndex is required!" });
    }

    const guest = await getGuestByIndexService(guestIndex);

    if (!guest) {
      return res.status(404).json({ message: "Guest not found." });
    }

    res.json({ message: "Guest found", guest });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving guest", error });
  }
};

/**
 * Get all guests
 */
export const getAllGuests = async (req, res) => {
  try {
    const guests = await getAllGuestsService();
    res.json({ message: "Guests retrieved successfully", guests });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving guest", error });
  }
};

/**
 * Update guest information by invite guestIndex
 */
export const updateGuest = async (req, res) => {
  try {
    const { guestIndex } = req.query;
    const updates = req.body;

    const updatedGuest = await updateGuestService(guestIndex, updates);

    if (!updatedGuest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.json({
      message: "Guest rsvp information updated successfully",
      guest: updatedGuest,
    });
  } catch (error) {
    console.error("Update failed:", error);
    res
      .status(500)
      .json({ message: "Error updating guest rsvp", error: error.message });
  }
};
