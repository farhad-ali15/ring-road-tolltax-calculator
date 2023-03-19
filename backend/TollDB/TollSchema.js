import mongoose from "mongoose";

const TollTaxSchema = new mongoose.Schema({
  entryPoint: {
    type: String,
    required: true,
  },
  exitPoint: {
    type: String,
    required: true,
  },
  dayOfWeek: {
    type: String,
    required: true,
  },
  numberPlate: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  tollTax: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const TollTax = mongoose.model("TollTax", TollTaxSchema);
