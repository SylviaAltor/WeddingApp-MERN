import Invitation from "../models/invitationModel.js";
import Guest from "../models/guestModel.js";

/**
 * Create a new invitation
 *
 * @param {string} guestName
 * @param {string} guestEmail
 * @returns {Promise<Object>} Created invitation
 */
export const createInvitationService = async (guestName, guestEmail) => {
  const newInvitation = new Invitation({ guestName, guestEmail });
  return await newInvitation.save();
};

/**
 * Find an invitation by invite code
 *
 * @param {string} inviteCode
 * @returns {Promise<Object|null>} Found invitation or null
 */
export const getInvitationByCodeService = async (inviteCode) => {
  return await Invitation.findOne({ inviteCode: inviteCode.toUpperCase() });
};

/**
 * Retrieve all invitations
 *
 * @returns {Promise<Array>} All invitations
 */
export const getAllInvitationsService = async () => {
  return await Invitation.find();
};

/**
 * Update an invitation by invite code
 *
 * @param {string} inviteCode
 * @param {Object} updates
 * @returns {Promise<Object|null>} Updated invitation or null
 */
export const updateInvitationService = async (inviteCode, updates) => {
  try {
    const updatedInvitation = await Invitation.findOneAndUpdate(
      { inviteCode },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedInvitation)
      throw new Error(`Invitation with inviteCode ${inviteCode} not found`);

    return updatedInvitation;
  } catch (error) {
    console.error(`Error updating invitation: ${error.message}`);
    throw error;
  }
};

/**
 * Delete an invitation by invite code
 *
 * @param {string} inviteCode
 * @returns {Promise<Object|null>} Deleted invitation or null
 */
export const deleteInvitationService = async (inviteCode) => {
  try {
    const deletedInvitation = await Invitation.findOneAndDelete({ inviteCode });
    if (!deletedInvitation) {
      throw new Error(`Invitation with inviteCode ${inviteCode} not found`);
    }

    const deletedGuest = await Guest.findOneAndDelete({
      guestIndex: deletedInvitation.guestIndex,
    });

    return {
      deletedInvitation,
      deletedGuest: deletedGuest ? true : false,
    };
  } catch (error) {
    console.error(`Error deleting invitation: ${error.message}`);
    throw error;
  }
};

// Retrieve all guest information from invitationModel and guestMode
export const getAllGuestDetailsService = async () => {
  try {
    const invitations = await Invitation.find().lean();
    const guests = await Guest.find().lean();

    const combined = invitations.map(invite => {
      const guestInfo = guests.find(g => g.guestIndex === invite.guestIndex) || {};
      return {
        ...invite,
        ...guestInfo,
      };
    });

    return combined;
  } catch (err) {
    console.error("Error fetching guest data from two models:", err);
    throw err;
  }
};
