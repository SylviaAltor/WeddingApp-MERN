import Invitation from "../models/invitationModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginGuest = async (req, res) => {
    try {
        const { inviteCode } = req.body;

        if (!inviteCode) {
            return res.status(400).json({ message: "Invite code is required" });
        }
        
        const upperCode = inviteCode.toUpperCase();

        // Filter guest by inviteCode
        const guest = await Invitation.findOne({ inviteCode: upperCode });

        if (!guest) {
            return res.status(401).json({ message: "No guest record found. "});
        }

        // Generate JWT Token
        const token = jwt.sign({id: guest._id, role: "guest"}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.json({
            message: "Guest login successful",
            token,
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error Logging in", error: error.message });
    }
}