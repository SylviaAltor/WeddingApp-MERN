import Guest from "../models/guestModel.js";
import redisClient from "../config/redisClient.js";

/**
 * Find a guest by guestIndex
 */
export const getGuestByIndexService = async (guestIndex) => {
  const cacheKey = `guest:${guestIndex}`;

  const cachedGuest = await redisClient.get(cacheKey);
  if (cachedGuest) {
    return JSON.parse(cachedGuest);
  }

  // Cache miss: query MongoDB
  const guest = await Guest.findOne({ guestIndex });

  if (guest) {
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(guest));
  }

  return guest;
};

/**
 * Retrieve all guest information
 */
export const getAllGuestsService = async () => {
  const cacheKey = "guests:all"; 

  const cachedGuests = await redisClient.get(cacheKey);
  if (cachedGuests) {
    return JSON.parse(cachedGuests);
  }

  const guests = await Guest.find();

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(guests));

  return guests;
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

    if (!updatedGuest) {
      throw new Error(`Guest with index ${guestIndex} not found`);
    }

    // Invalidate Redis cache after update
    const cacheKey = `guest:${guestIndex}`;
    await redisClient.del(cacheKey);
    await redisClient.del("guests:all");

    return updatedGuest;
  } catch (error) {
    console.error(`Error updating guest: ${error.message}`);
    throw error;
  }
};
