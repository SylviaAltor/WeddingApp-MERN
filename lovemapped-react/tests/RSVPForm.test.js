import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import RSVPForm from "../src/components/RSVP/RSVPForm.jsx";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

const mockGuest = {
  guestIndex: 1,
  rsvpStatus: "Confirmed",
  plusOne: "Yes",
  appetizerChoice: "Caesar Salad",
  entréeChoice: "Filet Mignon with Wild Mushroom",
  dietaryRestrictions: "None",
};

describe("RSVPForm Component", () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.setItem("token", "mocked-token");
  });

  it("renders all fields with initial values", () => {
    render(<RSVPForm guest={mockGuest} />);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("Caesar Salad")).toBeInTheDocument();
    expect(screen.getByText("Filet Mignon with Wild Mushroom")).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("allows editing and submitting a field", async () => {
    render(<RSVPForm guest={mockGuest} />);

    // Click Edit on "RSVP Status"
    fireEvent.click(screen.getAllByText("Edit")[0]);

    // Change RSVP Status to "Declined"
    fireEvent.change(screen.getByDisplayValue("Confirmed"), {
      target: { value: "Declined" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/guest/rsvp/update?guestIndex=1",
        expect.objectContaining({
          method: "PUT",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            Authorization: "Bearer mocked-token",
          }),
          body: expect.stringContaining("Declined"),
        })
      )
    );

    // Should render updated field after submission
    expect(screen.getByText("Declined")).toBeInTheDocument();
  });
});
