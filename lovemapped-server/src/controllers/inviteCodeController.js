import {createInvitationService, getInvitationByCodeService, getAllInvitationsService, updateInvitationService, deleteInvitationService,
} from "../services/inviteCodeService.js";

/**
 * Create a new invitation
 */
export const createInvitation = async (req, res) => {
  try {
    const { guestName, guestEmail } = req.body;

    if (!guestName || !guestEmail) {
      return res.status(400).json({ message: "Guest name and email are required." });
    }

    const newInvitation = await createInvitationService(guestName, guestEmail);

    res.status(201).json({
      message: "Guest created successfully",
      invitation: newInvitation,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating guest", error });
  }
};

/**
 * Get invitation by invite code
 */
export const getInvitationByCode = async (req, res) => {
  try {
    const { inviteCode } = req.query;

    if (!inviteCode) {
      return res.status(400).json({ message: "Invite code is required" });
    }

    const invitation = await getInvitationByCodeService(inviteCode);

    if (!invitation) {
      return res.status(404).json({ message: "Guest not found." });
    }

    res.json({ message: "Guest found", invitation });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving guest", error });
  }
};

/**
 * Get all invitations
 */
export const getAllInvitations = async (req, res) => {
  try {
    const invitations = await getAllInvitationsService();
    res.json({ message: "Guest retrieved successfully", invitations });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving guest", error });
  }
};

/**
 * Update invitation by invite code
 */
export const updateInvitation = async (req, res) => {
  try {
    const { inviteCode } = req.query;
    const updates = req.body;

    const updatedInvitation = await updateInvitationService(inviteCode, updates);

    if (!updatedInvitation) {
      return res.status(404).json({ message: "Guest not found." });
    }

    res.json({
      message: "Guest information updated successfully",
      invitation: updatedInvitation,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating guest", error });
  }
};

/**
 * Delete invitation by invite code
 */
export const deleteInvitation = async (req, res) => {
  try {
    const { inviteCode } = req.query;

    const deletedInvitation = await deleteInvitationService(inviteCode);

    if (!deletedInvitation) {
      return res.status(404).json({ message: "Guest not found." });
    }

    res.json({ message: "Guest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting guest", error });
  }
};
