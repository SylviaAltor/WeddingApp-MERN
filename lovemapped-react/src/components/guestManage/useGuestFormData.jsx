import { useState, useEffect } from "react";
import axios from "axios";

export default function useGuestFormData(showManageTable) {
  const [guestList, setGuestList] = useState([]);
  
  useEffect(() => {
    if (showManageTable) {
      axios.get("/api/guest/full")
        .then(res => setGuestList(res.data.guests || []))
        .catch(err => {
          console.error("Error fetching guests:", err);
          setGuestList([]);
        });
    }
  }, [showManageTable]);

  const updateGuest = async (editingGuestData) => {
    try {
      const { inviteCode, _id, ...updates } = editingGuestData;
      const response = await axios.put(
        `/api/guest/update?inviteCode=${inviteCode}`,
        updates
      );
      setGuestList(prev =>
        prev.map(guest =>
          guest.guestIndex === editingGuestData.guestIndex
            ? { ...guest, ...editingGuestData }
            : guest
        )
      );
      return response.data.message;
    } catch (error) {
      console.error("Error updating guest:", error);
      throw error;
    }
  };

  const deleteGuest = async (guestToDelete) => {
    try {
      await axios.delete(`/api/guest/delete`, {
        params: { inviteCode: guestToDelete.inviteCode },
      });
      setGuestList(prev =>
        prev.filter(guest => guest.guestIndex !== guestToDelete.guestIndex)
      );
    } catch (error) {
      console.error("Error deleting guest:", error);
      throw error;
    }
  };

  const sendInvites = async (selectedGuests, guestList) => {
    try {
      const selected = guestList.filter(guest =>
        selectedGuests.includes(guest.guestIndex)
      );
      const response = await axios.post("/api/sendInvites", {
        guests: selected,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending invites:", error);
      throw error;
    }
  };

  return { guestList, setGuestList, updateGuest, deleteGuest, sendInvites };
}
