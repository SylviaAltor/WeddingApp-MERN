import Invitation from "../models/invitationModel.js";
import Guest from "../models/guestModel.js";
import redisClient from "../config/redisClient.js";

/**
 * Create a new invitation
 *
 */

export const createInvitationService = async (guestName, guestEmail) => {
  const newInvitation = new Invitation({ guestName, guestEmail });
  const saved = await newInvitation.save();

  await redisClient.del("invitations:all");
  return saved;
};

/**
 * Find an invitation by invite code
 *
 */
export const getInvitationByCodeService = async (inviteCode) => {
  const cacheKey = `invitation:${inviteCode.toUpperCase()}`;

  const cachedInvitation = await redisClient.get(cacheKey);
  if (cachedInvitation) {
    return JSON.parse(cachedInvitation);
  }

  const invitation = await Invitation.findOne({ inviteCode: inviteCode.toUpperCase() });

  if (invitation) {
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(invitation));
  }

  return invitation;
};

/**
 * Retrieve all invitations
 *
 */
export const getAllInvitationsService = async () => {
  const cacheKey = "invitations:all";

  const cachedInvitations = await redisClient.get(cacheKey);
  if (cachedInvitations) {
    return JSON.parse(cachedInvitations);
  }

  const invitations = await Invitation.find();

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(invitations));

  return invitations;
};

/**
 * Update an invitation by invite code
 *
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

    const cacheKey = `invitation:${inviteCode.toUpperCase()}`;
    await redisClient.del(cacheKey);
    await redisClient.del("invitations:all");

    return updatedInvitation;
  } catch (error) {
    console.error(`Error updating invitation: ${error.message}`);
    throw error;
  }
};

/**
 * Delete an invitation by invite code
 *
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

    await redisClient.del(`invitation:${inviteCode.toUpperCase()}`);
    await redisClient.del("invitations:all");

    if (deletedInvitation.guestIndex) {
      await redisClient.del(`guest:${deletedInvitation.guestIndex}`);
      await redisClient.del("guests:all");
    }

    return {
      deletedInvitation,
      deletedGuest: deletedGuest ? true : false,
    };
  } catch (error) {
    console.error(`Error deleting invitation: ${error.message}`);
    throw error;
  }
};

/**
 * Retrieve guest information from invitationModel and guestMode
 *
 */
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
