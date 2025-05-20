import Couple from "../models/coupleModel.js";

/**
 * Get the Couple record from the database
 * 
 * @returns {Promise<Object|null>} The Couple record (excluding password), or null if not found
 */
export const getCoupleData = async () => {
  return await Couple.findOne({}, "-password");
};


// ==================== For Test ====================
/**
 * Insert a Couple record with encrypted password (if none exists)
 * 
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise<Object>} Created Couple record
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