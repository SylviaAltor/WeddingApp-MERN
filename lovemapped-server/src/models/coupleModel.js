import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt for password encryption

/**
 * Couple Schema
 *
 * This model stores the admin credentials:
 * - email: Unique identifier for login
 * - password: Hashed password for authentication
 * Only allow read and update, no create and delete
 */
const CoupleSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
});

/**
 * Hash password before saving to the database
 * Ensures passwords are securely stored
 */
CoupleSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Validate entered password by comparing it to the hashed password in the database
 */
CoupleSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model for use in authentication logic
export default mongoose.model("Couple", CoupleSchema);