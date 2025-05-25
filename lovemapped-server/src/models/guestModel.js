import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  guestIndex: {
    type: Number,
    unique: true,
    required: true,
  },
  rsvpStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Declined"],
    default: "Pending",
  },
  plusOne: {
    type: Boolean,
    default: false,
  },
  appetizerChoice: {
    type: String,
    enum: ["Salmon Canapés", "Caesar Salad", "Pumpkin Cream"],
  },
  entréeChoice: {
    type: String,
    enum: [
      "Roasted Rack of Lamb",
      "Filet Mignon with Wild Mushroom",
      "Eggplant Lasagna (Vegetarian)",
    ],
  },
  dietaryRestrictions: {
    type: String,
    default: "",
    trim: true,
  },
  geoCoordinates: {
    type: { lat: Number, lng: Number },
    default: null,
  },
});

export default mongoose.model("Guests", guestSchema);