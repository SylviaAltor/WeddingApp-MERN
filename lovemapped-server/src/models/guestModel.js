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
    type: String,
    enum: ["Yes", "No"],
    default: "No",
  },
  appetizerChoice: {
    type: String,
    enum: ["Not Selected", "Salmon Canapés", "Caesar Salad", "Pumpkin Cream"],
    default: "Not Selected",
  },
  entréeChoice: {
    type: String,
    enum: [
      "Not Selected",
      "Roasted Rack of Lamb",
      "Filet Mignon with Wild Mushroom",
      "Eggplant Lasagna (Vegetarian)",
    ],
    default: "Not Selected",
  },
  dietaryRestrictions: {
    type: String,
    default: "NA",
    trim: true,
  },
  geoCoordinates: {
    lat: {
      type: Number,
      default: null,
    },
    lng: {
      type: Number,
      default: null,
    },
  },
});

export default mongoose.model("Guests", guestSchema);
