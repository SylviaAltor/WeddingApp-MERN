import { jest } from "@jest/globals";
import Guest from "../src/models/guestModel.js";
import { getGuestByIndexService, getAllGuestsService, updateGuestService} from "../src/services/guestService.js";

describe("Guest Service", () => {
  const mockGuest = {
    guestIndex: 1,
    rsvpStatus: "Confirmed",
    plusOne: "Yes",
    appetizerChoice: "Caesar Salad",
    entréeChoice: "Filet Mignon with Wild Mushroom",
    dietaryRestrictions: "NA",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getGuestByIndexService should return guest", async () => {
    Guest.findOne = jest.fn().mockResolvedValue(mockGuest);

    const result = await getGuestByIndexService(1);
    expect(Guest.findOne).toHaveBeenCalledWith({ guestIndex: 1 });
    expect(result).toEqual(mockGuest);
  });

  test("getAllGuestsService should return all guests", async () => {
    const mockGuests = [mockGuest, { ...mockGuest, guestIndex: 2 }];
    Guest.find = jest.fn().mockResolvedValue(mockGuests);

    const result = await getAllGuestsService();
    expect(Guest.find).toHaveBeenCalled();
    expect(result).toEqual(mockGuests);
  });

  test("updateGuestService should return updated guest", async () => {
    const updates = { rsvpStatus: "Declined" };
    const updatedGuest = { ...mockGuest, ...updates };
    Guest.findOneAndUpdate = jest.fn().mockResolvedValue(updatedGuest);

    const result = await updateGuestService(1, updates);
    expect(Guest.findOneAndUpdate).toHaveBeenCalledWith(
      { guestIndex: 1 },
      { $set: updates },
      { new: true, runValidators: true }
    );
    expect(result).toEqual(updatedGuest);
  });

  test("updateGuestService should throw error if guest not found", async () => {
    Guest.findOneAndUpdate = jest.fn().mockResolvedValue(null);

    await expect(updateGuestService(999, { rsvpStatus: "Declined" }))
      .rejects
      .toThrow("Guest with index 999 not found");
  });
});