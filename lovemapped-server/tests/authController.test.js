import { jest } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import Couple from "../src/models/coupleModel.js";
import bcrypt from "bcryptjs";

describe("AuthController - Admin Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should return JWT token on successful login", async () => {
    const hashedPassword = await bcrypt.hash("correctpassword", 10);

    // Manually mock findOne
    Couple.findOne = jest.fn().mockResolvedValue({
      _id: "admin123",
      password: hashedPassword,
      matchPassword: async (input) => bcrypt.compare(input, hashedPassword),
    });

    const res = await request(app)
      .post("/api/auth/admin/login")
      .send({ password: "correctpassword" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Should return 401 for incorrect password", async () => {
    const hashedPassword = await bcrypt.hash("correctpassword", 10);

    Couple.findOne = jest.fn().mockResolvedValue({
      _id: "admin123",
      password: hashedPassword,
      matchPassword: async (input) => bcrypt.compare(input, hashedPassword),
    });

    const res = await request(app)
      .post("/api/auth/admin/login")
      .send({ password: "wrongpassword" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid password.");
  });

  test("Should return 401 if no admin record exists", async () => {
    Couple.findOne = jest.fn().mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/admin/login")
      .send({ password: "anypassword" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No admin record found.");
  });

  test("Should return 500 if server error occurs", async () => {
    Couple.findOne = jest.fn().mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/api/auth/admin/login")
      .send({ password: "correctpassword" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Error logging in");
  });
});
