import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    skill: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

export default mongoose.model("Team", teamSchema);
