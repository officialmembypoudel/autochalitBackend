import mongoose from "mongoose";

const gadgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
});

export const Gadget = mongoose.model("Gadget", gadgetSchema);
