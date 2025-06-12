import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";

export default function RSVPForm({ guest }) {
  const [editingField, setEditingField] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [selectedCity, setSelectedCity] = useState(null);

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
      country: guest?.country || "",
      city: guest?.city || "",
    },
  });

  const watchedFields = watch();
  const watchedCountry = watch("country");

  useEffect(() => {
    const fetchCities = async () => {
      if (!watchedCountry) return;
      try {
        const response = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${watchedCountry}&limit=10&sort=-population`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "108716eca5mshdcd879c2ca0741bp136ff5jsndee2fbe70974", // Real Key
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );
        const data = await response.json();
        const formattedCities = data.data.map((city) => ({
          label: city.name,
          value: city.name,
          latitude: city.latitude,
          longitude: city.longitude,
        }));
        setCityOptions(formattedCities);
      } catch (err) {
        console.error("Error fetching cities", err);
        setCityOptions([]);
      }
    };

    fetchCities();
  }, [watchedCountry]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        guestIndex: guest.guestIndex,
        ...data,
        geoCoordinates: {
          lat: selectedCity?.latitude || null,
          lng: selectedCity?.longitude || null,
        },
      };

      await fetch(`/api/guest/rsvp/update?guestIndex=${guest.guestIndex}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      setEditingField(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

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

      {/* Country dropdown */}
      <div style={{ marginBottom: "1em" }}>
        <label style={{ fontWeight: "bold" }}>Country:</label>{" "}
        {editingField === "country" ? (
          <>
            <div style={{ display: "inline-block", minWidth: "200px" }}>
              <Select
                options={countryOptions}
                defaultValue={countryOptions.find(
                  (c) => c.value === watchedFields.country
                )}
                onChange={(selected) => {
                  setValue("country", selected.value);
                  setValue("city", "");
                }}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "30px",
                    height: "30px",
                    fontSize: "0.9rem",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: "4px",
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    height: "30px",
                  }),
                }}
              />
            </div>
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
            <span>{watchedFields.country}</span>
            <button
              type="button"
              onClick={() => setEditingField("country")}
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

      {/* City dropdown */}
      <div style={{ marginBottom: "1em" }}>
        <label style={{ fontWeight: "bold" }}>City:</label>{" "}
        {editingField === "city" ? (
          <>
            <div style={{ display: "inline-block", minWidth: "200px" }}>
              <Select
                options={cityOptions}
                value={cityOptions.find((c) => c.value === watchedFields.city)}
                onChange={(selected) => {
                  setValue("city", selected.value);
                  setSelectedCity(selected);
                }}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "30px",
                    height: "30px",
                    fontSize: "0.9rem",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: "4px",
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    height: "30px",
                  }),
                }}
              />
            </div>
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
            <span>{watchedFields.city}</span>
            <button
              type="button"
              onClick={() => setEditingField("city")}
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
    </form>
  );
}
