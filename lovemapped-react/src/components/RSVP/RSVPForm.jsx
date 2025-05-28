import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function RSVPForm({ guest }) {
  const [editingField, setEditingField] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rsvpStatus: guest?.rsvpStatus || "Pending",
      plusOne: guest?.plusOne || "No",
      appetizerChoice: guest?.appetizerChoice || "Not Selected",
      entréeChoice: guest?.entréeChoice || "Not Selected",
      dietaryRestrictions: guest?.dietaryRestrictions || "NA",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        guestIndex: guest.guestIndex,
        ...data,
      };

      await fetch(`/api/guest/rsvp/update?guestIndex=${guest.guestIndex}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      setEditingField(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const watchedFields = watch();

  const renderField = (label, name, options = null) => {
    const isEditing = editingField === name;

    return (
      <div style={{ marginBottom: "1em" }}>
        <label style={{ fontWeight: "bold" }}>{label}:</label>{" "}
        {isEditing ? (
          <>
            {options ? (
              <select {...register(name)} defaultValue={watchedFields[name]}>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input {...register(name)} />
            )}
            <button
              type="button"
              onClick={() => handleSubmit(onSubmit)()}
              style={{
                marginLeft: "1rem",
                borderRadius: "20px",
                padding: "0.3rem 1rem",
              }}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <span>{watchedFields[name]}</span>
            <button
              type="button"
              onClick={() => setEditingField(name)}
              style={{
                marginLeft: "1rem",
                borderRadius: "20px",
                padding: "0.3rem 1rem",
              }}
            >
              Edit
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <form>
      {renderField("RSVP Status", "rsvpStatus", [
        "Pending",
        "Confirmed",
        "Declined",
      ])}
      {renderField("Plus One", "plusOne", ["Yes", "No"])}
      {renderField("Appetizer Choice", "appetizerChoice", [
        "Salmon Canapés",
        "Caesar Salad",
        "Pumpkin Cream",
      ])}
      {renderField("Entrée Choice", "entréeChoice", [
        "Roasted Rack of Lamb",
        "Filet Mignon with Wild Mushroom",
        "Eggplant Lasagna (Vegetarian)",
      ])}
      {renderField("Dietary Restrictions", "dietaryRestrictions")}
    </form>
  );
}
