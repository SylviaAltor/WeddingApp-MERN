import Couple from "../models/coupleModel.js";

/**
 * Get the Couple record from the database
 * 
 */
export const getCoupleData = async () => {
  const cacheKey = "couple:data";

  const cachedCouple = await redisClient.get(cacheKey);
  if (cachedCouple) {
    return JSON.parse(cachedCouple);
  }

  const couple = await Couple.findOne({}, "-password");

  if (couple) {
    await redisClient.setEx(cacheKey, 86400, JSON.stringify(couple));
  }

  return couple;
};



// ==================== For Test ====================
/**
 * Insert a Couple record with encrypted password (if none exists)
 * 
 */
export const createCouple = async (email, password) => {
  return await Couple.create({ email, password });
};

/**
 *  Delete
 */
export const testDeleteCouple = async (email) => {
  return await Couple.deleteOne({ email });
};

/**
 * Update
 */
export const testUpdateCouple = async (email, updates) => {
  return await Couple.findOneAndUpdate(
    { email },
    updates,
    { new: true }
  );
};