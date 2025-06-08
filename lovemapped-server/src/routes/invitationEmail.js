import express from "express";
import Invitation from "../models/invitationModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import redisClient from "../config/redisClient.js";

const router = express.Router();

/**
 * POST /api/send-invitations
 * Receive：{ inviteCodes: [ "ABC123", "XYZ789", ... ] }
 * Send email with the generated invitation code
 */
router.post("/api/send-invitations", async (req, res) => {
  const { inviteCodes } = req.body;

  if (!Array.isArray(inviteCodes) || inviteCodes.length === 0) {
    return res
      .status(400)
      .json({ error: "inviteCodes must be a non-empty array" });
  }

  try {
    const invitations = await Invitation.find({
      inviteCode: { $in: inviteCodes },
    });

    if (invitations.length === 0) {
      return res
        .status(404)
        .json({ error: "No invitations found with the provided codes" });
    }

    for (const invite of invitations) {
      const baseUrl = "#";

      const html = `
        <h2>Dear ${invite.guestName},</h2>
        <p>You're invited to our special event!</p>
        <p>Your invitation code is: <strong>${invite.inviteCode}</strong></p>
        <p>Please use this code to log in and confirm your attendance.</p>
        <p>Please <a href="${baseUrl}" target="_blank" rel="noopener noreferrer">click here</a> to visit our homepage and log in.</p>
        <p>Looking forward to seeing you!</p>
      `;

      try {
        await sendEmail({
          to: invite.guestEmail,
          subject: `Invitation for ${invite.guestName}`,
          html,
        });

        invite.invitationSent = true;
        invite.sentTime = new Date();
        await invite.save();
        await redisClient.del(`invitation:${invite.inviteCode.toUpperCase()}`);
        await redisClient.del("invitations:all");
      } catch (emailErr) {
        console.error(
          `Failed to send email to ${invite.guestEmail}:`,
          emailErr
        );
      }
    }

    res.json({ message: `${invitations.length} invitations sent.` });
  } catch (err) {
    console.error("Error in sending invitations:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
