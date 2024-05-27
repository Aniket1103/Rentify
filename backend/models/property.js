import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    default: false,
  },
  bathrooms: {
    type: Number,
    default: false,
  },
  hospitals: {
    type: Number,
    default: false,
  },
  colleges_nearby: {
    type: Number,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Property = mongoose.model("Property", propertySchema);