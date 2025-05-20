import { getCoupleData, createCouple, testUpdateCouple, testDeleteCouple } from "../services/coupleService.js";

/**
 * Get Couple Data (Admin Record)
 */
export const getCouple = async (req, res) => {
  try {
    const couple = await getCoupleData();
    res.json(couple);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Couple data" });
  }
};

/**
 * Create a Single Couple Record
 */
export const createCoupleRecord = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newCouple = await createCouple(email, password);
    res.status(201).json({ message: "Admin record created successfully", data: newCouple });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Update Couple Record
 */
export const updateCoupleRecord = async (req, res) => {
  try {
    const { email, updates } = req.body;
    const updatedCouple = await testUpdateCouple(email, updates);
    res.status(200).json({ message: "Record updated successfully", data: updatedCouple });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete Couple Record
 */
export const deleteCoupleRecord = async (req, res) => {
  try {
    const { email } = req.body;
    await testDeleteCouple(email);
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
