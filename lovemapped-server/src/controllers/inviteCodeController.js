/**
 * Invite Code Controller
 *
 * This controller handles the creation and retrieval of invitation codes.
 * It interacts with the Invitation model and provides API endpoints
 * for generating and managing invitation codes.
 */

import Invitation from "../models/invitationModel.js";

/**
 * Create a new invitation with a unique six-character invite code
 *
 */
export const createInvitation = async (req, res) => {
  try {
    const { guestName, guestEmail } = req.body;

    // Validate input
    if (!guestName || !guestEmail) {
      return res
        .status(400)
        .json({ message: "Guest name and email are required." });
    }

    // Create a new invitation entry
    const newInvitation = new Invitation({
      guestName,
      guestEmail,
    });

    await newInvitation.save();

    res
      .status(201)
      .json({
        message: "Guest created successfully",
        invitation: newInvitation,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating guest", error });
  }
};

/**
 * Retrieve an invitation by invite code
 *
 */
export const getInvitationByCode = async (req, res) => {
  try {
    const { inviteCode } = req.query;

    if (!inviteCode) {
      return res.status(400).json({ message: "Invite code is required" });
    }

    const upperCode = inviteCode.toUpperCase();

    // Find invitation by its unique invite code
    const invitation = await Invitation.findOne({ inviteCode: upperCode });

    if (!invitation) {
      return res.status(404).json({ message: "Guest not found." });
    }

    res.json({ message: "Guest found", invitation });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving guest", error });
  }
};

/**
 * Retrieve all invitations
 *
 */
export const getAllInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find();

    res.json({ message: "Guest retrieved successfully", invitations });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving guest", error });
  }
};

/**
 * Update an invitation by invite code
 */
export const updateInvitation = async (req, res) => {
  try {
    const { inviteCode } = req.query;
    const updates = req.body;

    const updatedInvitation = await Invitation.findOneAndUpdate(
      { inviteCode },
      { $set: updates }, // Only update provided fields
      { new: true } // Return updated document
    );

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
 * Delete an invitation by invite code
 */
export const deleteInvitation = async (req, res) => {
  try {
    const { inviteCode } = req.query;

    const deletedInvitation = await Invitation.findOneAndDelete({ inviteCode });

    if (!deletedInvitation) {
      return res.status(404).json({ message: "Guest not found." });
    }

    res.json({ message: "Guest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting guest", error });
  }
};
