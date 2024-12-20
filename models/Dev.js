import mongoose from "mongoose";

const devSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    skill: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      default: "male",
    },
    isMarried: {
      type: Boolean,
    },
  },
  {
    timeStamps: true,
  }
);

export default mongoose.model("Dev", devSchema);
