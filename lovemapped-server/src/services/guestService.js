import Guest from "../models/guestModel.js";

/**
 * Find a guest by guestIndex
 */
export const getGuestByIndexService = async (guestIndex) => {
  return await Guest.findOne({ guestIndex });
};

/**
 * Retrieve all guest information
 */
export const getAllGuestsService = async () => {
  return await Guest.find();
};

/**
 * Update guest information by guestIndex
 */
export const updateGuestService = async (guestIndex, updates) => {
  try {
    const updatedGuest = await Guest.findOneAndUpdate(
      { guestIndex },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updatedGuest)
      throw new Error(`Guest with index ${guestIndex} not found`);
    return updatedGuest;
  } catch (error) {
    console.error(`Error updating guest: ${error.message}`);
    throw error;
  }
};
