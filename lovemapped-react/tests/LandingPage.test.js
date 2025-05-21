/**
 * @file LandingPage.test.js
 * Tests for the LandingPage component
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Needed for useNavigate
import LandingPage from "../src/pages/LandingPage";

// Helper to render component with router context
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("LandingPage Component", () => {
  test("Renders welcome message and both buttons", () => {
    renderWithRouter(<LandingPage />);
    expect(
      screen.getByText(/Welcome to Sylvia & Voke's Wedding!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Guests this way please/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /This is our entrance/i })
    ).toBeInTheDocument();
  });

  test("Shows guest invitation code input after clicking guest button", async () => {
    renderWithRouter(<LandingPage />);
    const guestBtn = screen.getByRole("button", {
      name: /Guests this way please/i,
    });
    fireEvent.click(guestBtn);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/Enter invitation code/i)
      ).toBeInTheDocument();
    });
  });

  test("Shows admin code input after clicking admin button", async () => {
    renderWithRouter(<LandingPage />);
    const adminBtn = screen.getByRole("button", {
      name: /This is our entrance/i,
    });
    fireEvent.click(adminBtn);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/Enter admin code/i)
      ).toBeInTheDocument();
    });
  });
});
