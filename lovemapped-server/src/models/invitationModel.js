/**
 * Invitation Model
 *
 * This schema stores guest invitation data including:
 * - guestIndex: Auto-incremented numeric ID
 * - guestName: Name of the invited guest
 * - guestEmail: Email address of the guest
 * - inviteCode: Unique 6-character code (uppercase letters + digits)
 * - invitationSent: If a email invitation has been sent, updated with emailController.js
 * - sentTime: Store the last email's sending time, updated with emailController.js
 *
 * guestIndex is auto-incremented based on the last saved document.
 */

import mongoose from "mongoose";
import Guest from "./guestModel.js";
import redisClient from '../config/redisClient.js';

// Helper function to generate a 6-character invitation code
function generateInviteCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const InvitationSchema = new mongoose.Schema({
  guestIndex: {
    type: Number,
    unique: true,
  },
  guestName: {
    type: String,
    required: true,
  },
  guestEmail: {
    type: String,
    required: true,
  },
  inviteCode: {
    type: String,
    required: true,
    unique: true,
    default: () => generateInviteCode(),
  },
  invitationSent: {
    type: Boolean,
    default: false,
  },
  sentTime: {
    type: Date,
    default: null,
  },
});

// Pre-save hook to auto-increment guestIndex before saving
InvitationSchema.pre("save", async function (next) {
  if (!this.guestIndex) {
    const lastInvite = await this.constructor.findOne().sort("-guestIndex");
    this.guestIndex = lastInvite ? lastInvite.guestIndex + 1 : 1;
  }
  next();
});

InvitationSchema.post("save", async function (doc, next) {
  try {
    const existingGuest = await Guest.findOne({ guestIndex: doc.guestIndex });
    if (!existingGuest) {
      const newGuest = await Guest.create({ guestIndex: doc.guestIndex });

      await redisClient.set(
        `guest:${doc.guestIndex}`,
        JSON.stringify(newGuest),
        'EX',
        3600
      );
    }
    next();
  } catch (err) {
    console.error("Error creating guest entry or syncing to Redis:", err);
    next(err);
  }
});

export default mongoose.model("Invitation", InvitationSchema);
